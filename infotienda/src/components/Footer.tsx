import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div>
            <span className="text-3xl font-bold text-white tracking-wide mb-4 inline-block">
              Info<span className="text-blue-500">Tienda</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Tu destino confiable para la mejor tecnología. Ofrecemos una amplia selección de productos de alta calidad para satisfacer todas tus necesidades digitales.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors duration-300">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-1 after:bg-blue-500">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Inicio</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Productos</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Iniciar Sesión</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Registrarse</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Mi Carrito</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-1 after:bg-blue-500">
              Atención al Cliente
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Contacto</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Políticas de Devolución</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Términos y Condiciones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> Política de Privacidad</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-1 after:bg-blue-500">
              Contáctanos
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 hover:text-white transition-colors cursor-pointer group">
                <div className="bg-gray-800 p-2 rounded text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FaMapMarkerAlt size={16} />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-gray-300">Av. Tecnológica 1234, Ciudad de la Información, CP 1000</span>
              </li>
              <li className="flex items-start gap-4 hover:text-white transition-colors cursor-pointer group">
                <div className="bg-gray-800 p-2 rounded text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FaPhone size={16} />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-gray-300">+54 11 1234-5678</span>
              </li>
              <li className="flex items-start gap-4 hover:text-white transition-colors cursor-pointer group">
                <div className="bg-gray-800 p-2 rounded text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FaEnvelope size={16} />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-gray-300">soporte@infotienda.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Deep footer */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} InfoTienda. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-gray-600 font-bold italic tracking-wider text-sm select-none">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">VISA</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">MASTERCARD</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">PAYPAL</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">STRIPE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
