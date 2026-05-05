import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarFilters from '../components/SidebarFilters';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import type { Product, Category } from '../types/product';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prod, cats] = await Promise.all([
          productService.getProductById(id!),
          productService.getCategories()
        ]);
        setProduct(prod);
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching product details", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const onSearchSubmit = () => {
    navigate('/?search=' + encodeURIComponent(searchInput));
  };

  const handleCategorySelect = (catName: string) => {
    navigate('/?category=' + encodeURIComponent(catName));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto items-start">
      <SidebarFilters 
        categories={categories}
        selectedCategory={undefined}
        onSelectCategory={handleCategorySelect}
        searchQuery={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={onSearchSubmit}
        hideCategoriesOnMobile={true}
      />

      <div className="flex-1 w-full relative">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Volver
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : product ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 min-h-[300px]">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-[400px] object-contain" />
              ) : (
                <div className="text-gray-400 font-medium flex-col items-center flex">
                  <svg className="w-16 h-16 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Sin imagen
                </div>
              )}
            </div>
            
            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <div className="mb-2">
                <span className="text-sm font-semibold text-blue-500 uppercase tracking-wider">{product.categoryName}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="text-4xl font-black text-blue-600 tracking-tight mb-6">
                ${product.price ? product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 }) : '0.00'}
              </div>

              <div className="mb-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción del producto</h3>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {product.description || 'No hay descripción disponible para este producto.'}
                </p>
              </div>

              <div className="mt-auto">
                <div className="mb-4">
                  <span className={`px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-full ${
                    product.stockQuantity > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {product.stockQuantity > 0 ? `Stock Disponible (${product.stockQuantity})` : 'Agotado'}
                  </span>
                </div>
                
                <button 
                  onClick={() => addToCart(product.id, 1)}
                  disabled={product.stockQuantity <= 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {product.stockQuantity > 0 ? (
                    <>
                      Agregar al carrito
                      <FiShoppingCart className="w-5 h-5" />
                    </>
                  ) : (
                    'Sin Stock'
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center text-gray-500">
            Producto no encontrado.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
