import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            {/* Placeholder for Logo */}
            <span className="logo-text">InfoTienda</span>
          </Link>
        </div>
        <nav className="nav-links">
          {user ? (
            <>
              <span className="welcome-text">Hola, {user.email}</span>
              <button onClick={handleLogout} className="nav-btn logout-btn">
                <FaSignOutAlt /> Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
          <Link to="/cart" className="nav-link cart-link">
            <FaShoppingCart />
          </Link>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} InfoTienda. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
