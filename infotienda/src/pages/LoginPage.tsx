import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useLoginForm } from '../hooks/useLoginForm';

const LoginPage: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    handleGoogleLogin
  } = useLoginForm();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] w-full">
      <div className="bg-white p-10 rounded-2xl w-full max-w-md border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <h2 className="text-center mb-8 font-semibold text-3xl text-gray-800">Iniciar Sesión</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center border border-red-100 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-base transition-colors focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-base transition-colors focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
          <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base transition-all flex justify-center items-center gap-2 shadow-sm hover:shadow-md">
            Ingresar
          </button>
        </form>
        
        <div className="flex items-center text-center my-6 text-gray-400 text-sm relative before:content-[''] before:flex-1 before:h-px before:bg-gray-200 before:mr-4 after:content-[''] after:flex-1 after:h-px after:bg-gray-200 after:ml-4">
          o
        </div>
        
     <button 
  onClick={handleGoogleLogin} 
  className="w-full py-3.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold text-base transition-colors flex justify-center items-center gap-2"
>
  <FcGoogle className="text-xl" /> Continuar con Google
</button>

        <p className="text-center mt-6 text-sm text-gray-500">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
