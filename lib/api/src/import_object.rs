//! The import module contains the implementation data structures and helper functions used to
//! manipulate and access a wasm module's imports including memories, tables, globals, and
//! functions.
use std::collections::VecDeque;
use std::collections::{hash_map::Entry, HashMap};
use std::{
    borrow::{Borrow, BorrowMut},
    sync::{Arc, Mutex},
};
use wasmer_engine::NamedResolver;
use wasmer_vm::Export;

/// The `LikeNamespace` trait represents objects that act as a namespace for imports.
/// For example, an `Instance` or `Namespace` could be
/// considered namespaces that could provide imports to an instance.
pub trait LikeNamespace {
    /// Gets an export by name.
    fn get_namespace_export(&self, name: &str) -> Option<Export>;
    /// Gets all exports in the namespace.
    fn get_namespace_exports(&self) -> Vec<(String, Export)>;
}

/// All of the import data used when instantiating.
///
/// It's suggested that you use the [`imports!`] macro
/// instead of creating an `ImportObject` by hand.
///
/// [`imports!`]: macro.imports.html
///
/// # Usage:
/// ```ignore
/// use wasmer::{Exports, ImportObject, Function};
///
/// let mut import_object = ImportObject::new();
/// let mut env = Exports::new();
///
/// env.insert("foo", Function::new_native(foo));
/// import_object.register("env", env);
///
/// fn foo(n: i32) -> i32 {
///     n
/// }
/// ```
#[derive(Clone, Default)]
pub struct ImportObject {
    map: Arc<Mutex<HashMap<String, Box<dyn LikeNamespace>>>>,
}

impl ImportObject {
    /// Create a new `ImportObject`.
    pub fn new() -> Self {
        Default::default()
    }

    /// Gets an export given a module and a name
    ///
    /// # Usage
    /// ```ignore
    /// # use wasmer_vm::{ImportObject, Instance, Namespace};
    /// let mut import_object = ImportObject::new();
    /// import_object.get_export("module", "name");
    /// ```
    pub fn get_export(&self, module: &str, name: &str) -> Option<Export> {
        let guard = self.map.lock().unwrap();
        let map_ref = guard.borrow();
        if map_ref.contains_key(module) {
            let namespace = map_ref[module].as_ref();
            return namespace.get_namespace_export(name);
        }
        None
    }

    /// Returns true if the ImportObject contains namespace with the provided name.
    pub fn contains_namespace(&self, name: &str) -> bool {
        self.map.lock().unwrap().borrow().contains_key(name)
    }

    /// Register anything that implements `LikeNamespace` as a namespace.
    ///
    /// # Usage:
    /// ```ignore
    /// # use wasmer_vm::{ImportObject, Instance, Namespace};
    /// let mut import_object = ImportObject::new();
    ///
    /// import_object.register("namespace0", instance);
    /// import_object.register("namespace1", namespace);
    /// // ...
    /// ```
    pub fn register<S, N>(&mut self, name: S, namespace: N) -> Option<Box<dyn LikeNamespace>>
    where
        S: Into<String>,
        N: LikeNamespace + 'static,
    {
        let mut guard = self.map.lock().unwrap();
        let map = guard.borrow_mut();

        match map.entry(name.into()) {
            Entry::Vacant(empty) => {
                empty.insert(Box::new(namespace));
                None
            }
            Entry::Occupied(mut occupied) => Some(occupied.insert(Box::new(namespace))),
        }
    }

    fn get_objects(&self) -> VecDeque<((String, String), Export)> {
        let mut out = VecDeque::new();
        let guard = self.map.lock().unwrap();
        let map = guard.borrow();
        for (name, ns) in map.iter() {
            for (id, exp) in ns.get_namespace_exports() {
                out.push_back(((name.clone(), id), exp));
            }
        }
        out
    }
}

impl NamedResolver for ImportObject {
    fn resolve_by_name(&self, module: &str, name: &str) -> Option<Export> {
        self.get_export(module, name)
    }
}

/// Iterator for an `ImportObject`'s exports.
pub struct ImportObjectIterator {
    elements: VecDeque<((String, String), Export)>,
}

impl Iterator for ImportObjectIterator {
    type Item = ((String, String), Export);
    fn next(&mut self) -> Option<Self::Item> {
        self.elements.pop_front()
    }
}

impl IntoIterator for ImportObject {
    type IntoIter = ImportObjectIterator;
    type Item = ((String, String), Export);

    fn into_iter(self) -> Self::IntoIter {
        ImportObjectIterator {
            elements: self.get_objects(),
        }
    }
}

// The import! macro for ImportObject

/// Generate an [`ImportObject`] easily with the `imports!` macro.
///
/// [`ImportObject`]: struct.ImportObject.html
///
/// # Usage
///
/// ```
/// # use wasmer::{Function, Store};
/// # let store = Store::default();
/// use wasmer::imports;
///
/// let import_object = imports! {
///     "env" => {
///         "foo" => Function::new_native(&store, foo)
///     },
/// };
///
/// fn foo(n: i32) -> i32 {
///     n
/// }
/// ```
#[macro_export]
macro_rules! imports {
    ( $( $ns_name:expr => $ns:tt ),* $(,)? ) => {
        {
            let mut import_object = $crate::ImportObject::new();

            $({
                let namespace = $crate::import_namespace!($ns);

                import_object.register($ns_name, namespace);
            })*

            import_object
        }
    };
}

#[macro_export]
#[doc(hidden)]
macro_rules! namespace {
    ($( $import_name:expr => $import_item:expr ),* $(,)? ) => {
        $crate::import_namespace!( { $( $import_name => $import_item, )* } )
    };
}

#[macro_export]
#[doc(hidden)]
macro_rules! import_namespace {
    ( { $( $import_name:expr => $import_item:expr ),* $(,)? } ) => {{
        let mut namespace = $crate::Exports::new();

        $(
            namespace.insert($import_name, $import_item);
        )*

        namespace
    }};

    ( $namespace:ident ) => {
        $namespace
    };
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{Global, Store, Val};
    use wasm_common::Type;
    use wasmer_engine::ChainableNamedResolver;
    use wasmer_vm::Export;

    #[test]
    fn chaining_works() {
        let store = Store::default();
        let g = Global::new(&store, Val::I32(0));

        let imports1 = imports! {
            "dog" => {
                "happy" => g.clone()
            }
        };

        let imports2 = imports! {
            "dog" => {
                "small" => g.clone()
            },
            "cat" => {
                "small" => g.clone()
            }
        };

        let resolver = imports1.chain_front(imports2);

        let small_cat_export = resolver.resolve_by_name("cat", "small");
        assert!(small_cat_export.is_some());

        let happy = resolver.resolve_by_name("dog", "happy");
        let small = resolver.resolve_by_name("dog", "small");
        assert!(happy.is_some());
        assert!(small.is_some());
    }

    #[test]
    fn extending_conflict_overwrites() {
        let store = Store::default();
        let g1 = Global::new(&store, Val::I32(0));
        let g2 = Global::new(&store, Val::I64(0));

        let imports1 = imports! {
            "dog" => {
                "happy" => g1,
            },
        };

        let imports2 = imports! {
            "dog" => {
                "happy" => g2,
            },
        };

        let resolver = imports1.chain_front(imports2);
        let happy_dog_entry = resolver.resolve_by_name("dog", "happy").unwrap();

        assert!(if let Export::Global(happy_dog_global) = happy_dog_entry {
            happy_dog_global.global.ty == Type::I64
        } else {
            false
        });

        // now test it in reverse
        let store = Store::default();
        let g1 = Global::new(&store, Val::I32(0));
        let g2 = Global::new(&store, Val::I64(0));

        let imports1 = imports! {
            "dog" => {
                "happy" => g1,
            },
        };

        let imports2 = imports! {
            "dog" => {
                "happy" => g2,
            },
        };

        let resolver = imports1.chain_back(imports2);
        let happy_dog_entry = resolver.resolve_by_name("dog", "happy").unwrap();

        assert!(if let Export::Global(happy_dog_global) = happy_dog_entry {
            happy_dog_global.global.ty == Type::I32
        } else {
            false
        });
    }

    #[test]
    fn namespace() {
        let store = Store::default();
        let g1 = Global::new(&store, Val::I32(0));
        let namespace = namespace! {
            "happy" => g1
        };
        let imports1 = imports! {
            "dog" => namespace
        };

        let happy_dog_entry = imports1.resolve_by_name("dog", "happy").unwrap();

        assert!(if let Export::Global(happy_dog_global) = happy_dog_entry {
            happy_dog_global.global.ty == Type::I32
        } else {
            false
        });
    }

    #[test]
    fn imports_macro_allows_trailing_comma_and_none() {
        use crate::Function;

        let store = Default::default();

        fn func(arg: i32) -> i32 {
            arg + 1
        }

        let _ = imports! {
            "env" => {
                "func" => Function::new_native(&store, func),
            },
        };
        let _ = imports! {
            "env" => {
                "func" => Function::new_native(&store, func),
            }
        };
        let _ = imports! {
            "env" => {
                "func" => Function::new_native(&store, func),
            },
            "abc" => {
                "def" => Function::new_native(&store, func),
            }
        };
        let _ = imports! {
            "env" => {
                "func" => Function::new_native(&store, func)
            },
        };
        let _ = imports! {
            "env" => {
                "func" => Function::new_native(&store, func)
            }
        };
        let _ = imports! {
            "env" => {
                "func1" => Function::new_native(&store, func),
                "func2" => Function::new_native(&store, func)
            }
        };
        let _ = imports! {
            "env" => {
                "func1" => Function::new_native(&store, func),
                "func2" => Function::new_native(&store, func),
            }
        };
    }
}
