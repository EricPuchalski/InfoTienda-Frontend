import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import Footer from './Footer';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-20 flex justify-between items-center w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-bold text-white tracking-wide transition-colors">
                Info<span className="text-blue-500 group-hover:text-blue-400 transition-colors">Tienda</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex items-center gap-6 lg:gap-8">
            <Link to="/" className="text-gray-300 hover:text-white font-medium text-sm tracking-wide transition-colors">
              Productos
            </Link>

            {user ? (
              <>
                {isAdmin ? (
                  <Link to="/admin/products/new" className="text-blue-400 hover:text-blue-300 font-medium transition-colors border max-sm:hidden border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Gestionar Productos
                  </Link>
                ) : (
                  <Link to="/cart" className="text-gray-300 hover:text-blue-400 text-xl transition-all hover:scale-110 flex items-center justify-center p-2 rounded-full hover:bg-gray-800 relative">
                    <FaShoppingCart />
                    {cart && cart.items.length > 0 && (
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-gray-900">
                        {cart.items.length}
                      </span>
                    )}
                  </Link>
                )}
                
                <div className="h-6 w-px bg-gray-700 hidden sm:block mx-1"></div>
                
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-xs text-gray-500 font-medium">Conectado como</span>
                    <span className="text-sm text-gray-200 font-semibold">{user.email}</span>
                  </div>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors bg-gray-800 hover:bg-gray-800/80 px-3 py-2 rounded-md border border-gray-700 hover:border-red-900/50">
                    <FaSignOutAlt className="text-lg" /> <span className="hidden lg:inline-block text-sm font-medium">Salir</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-gray-300 hover:text-white font-medium text-sm transition-colors py-2 px-3 hover:bg-gray-800 rounded-md">Ingresar</Link>
                  <Link to="/register" className="text-white bg-blue-600 hover:bg-blue-500 font-medium text-sm transition-colors py-2 px-5 rounded-md shadow-lg shadow-blue-500/20">Registrarse</Link>
                </div>
                <Link to="/cart" className="text-gray-300 hover:text-blue-400 text-xl transition-all hover:scale-110 flex items-center justify-center p-2 rounded-full hover:bg-gray-800 relative mr-2">
                  <FaShoppingCart />
                  {cart && cart.items.length > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-gray-900">
                      {cart.items.length}
                    </span>
                  )}
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
