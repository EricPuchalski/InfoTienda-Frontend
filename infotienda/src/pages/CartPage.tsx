import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';

const CartPage: React.FC = () => {
  const { cart, isLoading, isUpdating, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = async (id: number, qty: number) => {
    try {
      await updateQuantity(id, qty);
    } catch (e) {
      alert("Hubo un error al actualizar el carrito. Es posible que el producto no tenga más stock disponible.");
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await removeItem(id);
    } catch (e) {
      alert("Hubo un error al eliminar el producto del carrito.");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (e) {
      alert("Ocurrió un problema de conectividad.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto mt-8">
        <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-8">¡Parece que aún no has agregado ningún producto!</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-md">
          Ver Productos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 transition-colors">
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Tu Carrito</h1>
        </div>
        <span className="text-gray-500 font-medium bg-white px-4 py-2 rounded-lg border border-gray-200">
          {cart.items.length} {cart.items.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {cart.items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              {/* Product Image */}
              <Link to={`/product/${item.productId}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center p-2 border border-gray-100 block hover:border-blue-300 transition-colors">
                {item.productImageUrl ? (
                  <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <span className="text-xs text-gray-400 font-medium">Sin imagen</span>
                )}
              </Link>
              
              {/* Info */}
              <div className="flex-1 w-full flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <Link to={`/product/${item.productId}`} className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                    {item.productName}
                  </Link>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isUpdating}
                    className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 disabled:opacity-50"
                    title="Eliminar producto"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-blue-600 font-bold mb-4">
                  ${item.price ? item.price.toLocaleString('es-AR', { minimumFractionDigits: 2 }) : '0.00'} c/u
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1 || isUpdating}
                      className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-800 text-sm">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={isUpdating}
                      className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="text-right">
                    <span className="block text-xs text-gray-500 mb-1">Subtotal</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${item.subTotal ? item.subTotal.toLocaleString('es-AR', { minimumFractionDigits: 2 }) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleClearCart}
              disabled={isUpdating}
              className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg disabled:opacity-50"
            >
              <FiTrash2 className="w-4 h-4" /> Vaciar carrito
            </button>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de Compra</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Productos ({cart.items.length})</span>
                <span>${cart.totalPrice ? cart.totalPrice.toLocaleString('es-AR', { minimumFractionDigits: 2 }) : '0.00'}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-emerald-600 font-medium">Gratis</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                <span className="text-gray-900 font-bold">Total</span>
                <span className="text-3xl font-black text-blue-600">
                  ${cart.totalPrice ? cart.totalPrice.toLocaleString('es-AR', { minimumFractionDigits: 2 }) : '0.00'}
                </span>
              </div>
            </div>
            
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
              Finalizar Compra
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Pago seguro y garantizado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
