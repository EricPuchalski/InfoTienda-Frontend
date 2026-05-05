import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerSchema } from '../schemas/auth.schema';

export const useRegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const formData = { firstName, lastName, email, password };
    
    const validationResult = registerSchema.safeParse(formData);

    if (!validationResult.success) {
      const flattenedErrors = validationResult.error.flatten().fieldErrors;
      const newFieldErrors: Record<string, string> = {};
      
      Object.entries(flattenedErrors).forEach(([key, messages]) => {
        if (messages && messages.length > 0) {
          newFieldErrors[key] = messages[0];
        }
      });
      
      setFieldErrors(newFieldErrors);
      return;
    }

    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError('Error al registrarse. Intenta nuevamente.');
      console.error(err);
    }
  };

  return {
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
  };
};
