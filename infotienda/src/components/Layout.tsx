import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import Footer from './Footer';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">InfoTienda</span>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-gray-600 font-medium">Hola, {user.email}</span>
              <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                <FaSignOutAlt /> Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
              <Link to="/register" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Register</Link>
            </>
          )}
          <Link to="/cart" className="text-gray-600 hover:text-blue-600 text-xl transition-colors">
            <FaShoppingCart />
          </Link>
        </nav>
      </header>
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
