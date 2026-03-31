import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchClient } from '../services/api';

interface User {
  email: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      // Try to fetch current user from backend using the HttpOnly cookie
      const data = await fetchClient('/auth/me'); 
      setUser(data);
    } catch (error) {
      // If 401/403 or error, user is not logged in
      console.log('User not authenticated');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: any) => {
    await fetchClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    await checkAuth(); // Refetch the user state after successful login
  };

  const register = async (data: any) => {
    await fetchClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  };


  const logout = async () => {
    try {
      await fetchClient('/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
      // Force cleanup anyway
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
