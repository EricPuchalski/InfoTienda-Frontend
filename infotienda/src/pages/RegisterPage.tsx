import React from 'react';
import { Link } from 'react-router-dom';
import { useRegisterForm } from '../hooks/useRegisterForm';

const RegisterPage: React.FC = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    fieldErrors,
    handleSubmit
  } = useRegisterForm();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] w-full">
      <div className="bg-white p-10 rounded-2xl w-full max-w-md border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <h2 className="text-center mb-8 font-semibold text-3xl text-gray-800">Crear Cuenta</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center border border-red-100 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-4">
            <div className="flex-1">
                <label htmlFor="firstName" className="block mb-2 text-sm text-gray-600">Nombre</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Juan"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-800 text-base transition-colors focus:outline-none focus:bg-white ${fieldErrors.firstName ? 'border-red-500 bg-red-50 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                />
                {fieldErrors.firstName && <span className="block mt-1 text-xs text-red-500">{fieldErrors.firstName}</span>}
            </div>
            <div className="flex-1">
                <label htmlFor="lastName" className="block mb-2 text-sm text-gray-600">Apellido</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Pérez"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-800 text-base transition-colors focus:outline-none focus:bg-white ${fieldErrors.lastName ? 'border-red-500 bg-red-50 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                />
                {fieldErrors.lastName && <span className="block mt-1 text-xs text-red-500">{fieldErrors.lastName}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-800 text-base transition-colors focus:outline-none focus:bg-white ${fieldErrors.email ? 'border-red-500 bg-red-50 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
            />
            {fieldErrors.email && <span className="block mt-1 text-xs text-red-500">{fieldErrors.email}</span>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-800 text-base transition-colors focus:outline-none focus:bg-white ${fieldErrors.password ? 'border-red-500 bg-red-50 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
            />
            {fieldErrors.password && <span className="block mt-1 text-xs text-red-500">{fieldErrors.password}</span>}
          </div>
          <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base transition-all mt-2 shadow-sm hover:shadow-md">Registrarse</button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Ingresa aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
