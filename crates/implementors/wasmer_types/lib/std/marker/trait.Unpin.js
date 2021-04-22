(function() {var implementors = {};
implementors["wasmer_types"] = [{"text":"impl&lt;K, V&gt; !Unpin for ArchivedPrimaryMap&lt;K, V&gt;","synthetic":true,"types":[]},{"text":"impl&lt;K, V&gt; Unpin for ArchivableIndexMap&lt;K, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;K: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;V: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;K, V&gt; !Unpin for ArchivedArchivableIndexMap&lt;K, V&gt;","synthetic":true,"types":[]},{"text":"impl&lt;K, V&gt; !Unpin for ArchivableIndexMapResolver&lt;K, V&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for VMExternRef","synthetic":true,"types":[]},{"text":"impl Unpin for VMExternRefInner","synthetic":true,"types":[]},{"text":"impl Unpin for ExternRef","synthetic":true,"types":[]},{"text":"impl Unpin for Features","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedFeatures","synthetic":true,"types":[]},{"text":"impl Unpin for FeaturesResolver","synthetic":true,"types":[]},{"text":"impl Unpin for LocalFunctionIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedLocalFunctionIndex","synthetic":true,"types":[]},{"text":"impl Unpin for LocalFunctionIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for LocalTableIndex","synthetic":true,"types":[]},{"text":"impl Unpin for LocalMemoryIndex","synthetic":true,"types":[]},{"text":"impl Unpin for LocalGlobalIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedLocalGlobalIndex","synthetic":true,"types":[]},{"text":"impl Unpin for LocalGlobalIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for FunctionIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedFunctionIndex","synthetic":true,"types":[]},{"text":"impl Unpin for FunctionIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for TableIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedTableIndex","synthetic":true,"types":[]},{"text":"impl Unpin for TableIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for GlobalIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedGlobalIndex","synthetic":true,"types":[]},{"text":"impl Unpin for GlobalIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for MemoryIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedMemoryIndex","synthetic":true,"types":[]},{"text":"impl Unpin for MemoryIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for SignatureIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedSignatureIndex","synthetic":true,"types":[]},{"text":"impl Unpin for SignatureIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for DataIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedDataIndex","synthetic":true,"types":[]},{"text":"impl Unpin for DataIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for ElemIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedElemIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ElemIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for CustomSectionIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedCustomSectionIndex","synthetic":true,"types":[]},{"text":"impl Unpin for CustomSectionIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for ExportIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedExportIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ExportIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for ImportIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedImportIndex","synthetic":true,"types":[]},{"text":"impl Unpin for ImportIndexResolver","synthetic":true,"types":[]},{"text":"impl Unpin for TableInitializer","synthetic":true,"types":[]},{"text":"impl !Unpin for ArchivedTableInitializer","synthetic":true,"types":[]},{"text":"impl Unpin for TableInitializerResolver","synthetic":true,"types":[]},{"text":"impl Unpin for DataInitializerLocation","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedDataInitializerLocation","synthetic":true,"types":[]},{"text":"impl Unpin for DataInitializerLocationResolver","synthetic":true,"types":[]},{"text":"impl&lt;'data&gt; Unpin for DataInitializer&lt;'data&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for OwnedDataInitializer","synthetic":true,"types":[]},{"text":"impl !Unpin for ArchivedOwnedDataInitializer","synthetic":true,"types":[]},{"text":"impl Unpin for OwnedDataInitializerResolver","synthetic":true,"types":[]},{"text":"impl Unpin for Atomically","synthetic":true,"types":[]},{"text":"impl Unpin for NonAtomically","synthetic":true,"types":[]},{"text":"impl&lt;'a, T, A&gt; Unpin for MemoryView&lt;'a, T, A&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;A: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Type","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedType","synthetic":true,"types":[]},{"text":"impl Unpin for TypeResolver","synthetic":true,"types":[]},{"text":"impl Unpin for V128","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedV128","synthetic":true,"types":[]},{"text":"impl Unpin for V128Resolver","synthetic":true,"types":[]},{"text":"impl Unpin for ExternType","synthetic":true,"types":[]},{"text":"impl Unpin for FunctionType","synthetic":true,"types":[]},{"text":"impl !Unpin for ArchivedFunctionType","synthetic":true,"types":[]},{"text":"impl Unpin for FunctionTypeResolver","synthetic":true,"types":[]},{"text":"impl Unpin for Mutability","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedMutability","synthetic":true,"types":[]},{"text":"impl Unpin for MutabilityResolver","synthetic":true,"types":[]},{"text":"impl Unpin for GlobalType","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedGlobalType","synthetic":true,"types":[]},{"text":"impl Unpin for GlobalTypeResolver","synthetic":true,"types":[]},{"text":"impl Unpin for GlobalInit","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedGlobalInit","synthetic":true,"types":[]},{"text":"impl Unpin for GlobalInitResolver","synthetic":true,"types":[]},{"text":"impl Unpin for TableType","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedTableType","synthetic":true,"types":[]},{"text":"impl Unpin for TableTypeResolver","synthetic":true,"types":[]},{"text":"impl Unpin for MemoryType","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedMemoryType","synthetic":true,"types":[]},{"text":"impl Unpin for MemoryTypeResolver","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for ImportType&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for ExportType&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Pages","synthetic":true,"types":[]},{"text":"impl Unpin for ArchivedPages","synthetic":true,"types":[]},{"text":"impl Unpin for PagesResolver","synthetic":true,"types":[]},{"text":"impl Unpin for Bytes","synthetic":true,"types":[]},{"text":"impl Unpin for PageCountOutOfRange","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for Value&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for PackedOption&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;K, V&gt; Unpin for BoxedSlice&lt;K, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;K: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, K, V&gt; Unpin for Iter&lt;'a, K, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;K: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, K, V&gt; Unpin for IterMut&lt;'a, K, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;K: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;K, V&gt; Unpin for IntoIter&lt;K, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;K: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;V: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;K&gt; Unpin for Keys&lt;K&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;K: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;K, V&gt; Unpin for PrimaryMap&lt;K, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;K: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;V: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;K, V&gt; Unpin for SecondaryMap&lt;K, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;K: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;V: Unpin,&nbsp;</span>","synthetic":true,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()