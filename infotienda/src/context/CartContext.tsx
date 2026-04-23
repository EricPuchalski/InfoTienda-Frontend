import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { cartService } from '../services/cartService';
import type { CartResponse } from '../types/cart';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartResponse | null;
  isLoading: boolean;
  isUpdating: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, isAuthenticated } = useAuth(); // Depend on auth changes to refresh or merge

  const refreshCart = async () => {
    setIsLoading(true);
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
      // Empty cart fallback
      setCart({ id: 0, items: [], totalPrice: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  // Track previous auth state to detect login transitions
  const [wasAuthenticated, setWasAuthenticated] = useState(isAuthenticated);

  useEffect(() => {
    if (!wasAuthenticated && isAuthenticated && cart && cart.items.length > 0) {
      // Just logged in with a populated guest cart, merge it!
      const mergeRequest = {
        items: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };
      cartService.mergeCart(mergeRequest)
        .then(updatedCart => setCart(updatedCart))
        .catch(error => {
          console.error('Failed to merge cart', error);
          refreshCart(); // fallback
        });
    } else {
      refreshCart();
    }
    setWasAuthenticated(isAuthenticated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    setIsUpdating(true);
    try {
      const updatedCart = await cartService.addItemToCart({ productId, quantity });
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to add item to cart', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    setIsUpdating(true);
    try {
      const updatedCart = await cartService.updateItemQuantity(cartItemId, { quantity });
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update cart item quantity', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async (cartItemId: number) => {
    setIsUpdating(true);
    try {
      const updatedCart = await cartService.removeItemFromCart(cartItemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove item from cart', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const clearCart = async () => {
    setIsUpdating(true);
    try {
      await cartService.clearCart();
      if (cart) {
        setCart({ ...cart, items: [], totalPrice: 0 });
      } else {
        setCart({ id: 0, items: [], totalPrice: 0 });
      }
    } catch (error) {
      console.error('Failed to clear cart', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <CartContext.Provider value={{ cart, isLoading, isUpdating, addToCart, updateQuantity, removeItem, clearCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
