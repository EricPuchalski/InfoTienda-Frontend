import { fetchClient } from './api';
import type { CartResponse, AddToCartRequest, UpdateCartItemRequest, MergeCartRequest } from '../types/cart';

export const cartService = {
  getCart: async (): Promise<CartResponse> => {
    return fetchClient('/cart');
  },

  addItemToCart: async (request: AddToCartRequest): Promise<CartResponse> => {
    return fetchClient('/cart/items', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  updateItemQuantity: async (cartItemId: number, request: UpdateCartItemRequest): Promise<CartResponse> => {
    return fetchClient(`/cart/items/${cartItemId}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  },

  removeItemFromCart: async (cartItemId: number): Promise<CartResponse> => {
    return fetchClient(`/cart/items/${cartItemId}`, {
      method: 'DELETE',
    });
  },

  clearCart: async (): Promise<void> => {
    return fetchClient('/cart', {
      method: 'DELETE',
    });
  },

  mergeCart: async (request: MergeCartRequest): Promise<CartResponse> => {
    return fetchClient('/cart/merge', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
};
