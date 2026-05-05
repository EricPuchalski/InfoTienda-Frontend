import React, { useState, useEffect, useRef } from 'react';
import SidebarFilters from '../components/SidebarFilters';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const ProductsPage: React.FC = () => {
  const {
    products,
    categories,
    loading,
    page,
    setPage,
    totalPages,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    categoryName,
    name,
    handleCategorySelect,
    handleSearchSubmit,
  } = useProducts();

  const [searchInput, setSearchInput] = useState(''); 
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSearchSubmit = (input: string) => {
    handleSearchSubmit(input);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto items-start">
      {/* Sidebar - Categories & Search */}
      <SidebarFilters 
        categories={categories}
        selectedCategory={categoryName}
        onSelectCategory={handleCategorySelect}
        searchQuery={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={() => onSearchSubmit(searchInput)}
      />

      {/* Main Content Area */}
      <div className="flex-1 w-full">
        {/* Top Header & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-xl text-gray-800 font-semibold uppercase tracking-wider mb-4 sm:mb-0">
            {name 
              ? `Resultados para "${name}"` 
              : (categoryName ? categoryName : 'Todos los Productos')}
          </h1>
          <div className="flex items-end gap-3 w-full sm:w-auto">
            <div className="relative flex flex-col min-w-[200px]" ref={sortRef}>
              <div 
                className="flex items-end justify-between border-b border-gray-400 pb-1 cursor-pointer group"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <div className="flex flex-col">
                  <span className="text-[0.8rem] text-[#337ab7] mb-0.5">
                    Ordenar por
                  </span>
                  <span className="text-[0.95rem] text-[#333] tracking-wide mt-1">
                    {sortBy === 'name' ? 'A - Z' :
                     sortBy === 'price' && sortDir === 'desc' ? 'Mayor a menor' :
                     'Menor a mayor'}
                  </span>
                </div>
                <svg className={`fill-current w-4 h-4 text-gray-500 mb-1 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>

              {isSortOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md border border-gray-100 z-50 rounded-sm mt-0.5">
                  <div 
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[0.95rem] text-[#333] transition-colors"
                    onClick={() => { setSortBy('name'); setSortDir('asc'); setPage(0); setIsSortOpen(false); }}
                  >
                    A - Z
                  </div>
                  <div 
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[0.95rem] text-[#333] transition-colors"
                    onClick={() => { setSortBy('price'); setSortDir('desc'); setPage(0); setIsSortOpen(false); }}
                  >
                    Mayor a menor
                  </div>
                  <div 
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[0.95rem] text-[#333] transition-colors"
                    onClick={() => { setSortBy('price'); setSortDir('asc'); setPage(0); setIsSortOpen(false); }}
                  >
                    Menor a mayor
                  </div>
                </div>
              )}
            </div>

            <button className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded text-[#ea4335] hover:bg-gray-50 transition-colors focus:outline-none ml-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button 
                  disabled={page === 0}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`w-10 h-10 rounded flex items-center justify-center font-medium ${
                        page === i 
                          ? 'bg-blue-600 text-white' 
                          : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center text-gray-500">
            No se encontraron productos con estos filtros.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
