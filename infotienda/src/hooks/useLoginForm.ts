import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas. Por favor intenta de nuevo.');
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_OAUTH2_GOOGLE_URL || 'http://localhost:8080/oauth2/authorization/google';
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    handleGoogleLogin
  };
};
