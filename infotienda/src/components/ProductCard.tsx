import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';
import { FiShoppingCart } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col h-full relative group transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Stock Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm backdrop-blur-md ${
          product.stockQuantity > 0 
            ? 'bg-emerald-500/90 text-white' 
            : 'bg-rose-500/90 text-white'
        }`}>
          {product.stockQuantity > 0 ? 'Stock Disponible' : 'Agotado'}
        </span>
      </div>

      {/* Image container */}
      <div className="w-full aspect-square relative bg-white overflow-hidden p-6 border-b border-gray-50 flex items-center justify-center">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 ease-out" 
          />
        ) : (
          <div className="w-full h-full bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-400">
            <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-sm font-medium">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 bg-white border-t-2 border-gray-100">
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>
        
        <div className="mt-4">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-3xl font-black text-blue-600 tracking-tight">
                ${product.price ? product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 }) : '0.00'}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stockQuantity <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-xl hover:shadow-blue-600/20 active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 group/btn border border-blue-600 disabled:border-transparent"
          >
            {product.stockQuantity > 0 ? (
              <>
                Agregar al carrito
                <FiShoppingCart className="w-5 h-5 group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5 transition-transform" />
              </>
            ) : (
              'Sin Stock'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
