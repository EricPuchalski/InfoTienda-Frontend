import api from './api';
import type { Product, Category, PageableResponse } from '../types/product';

export interface ProductFilters {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
  active?: boolean;
  minStock?: number;
  name?: string;
  categoryName?: string;
}

export const productService = {
  getProducts: async (filters: ProductFilters): Promise<PageableResponse<Product>> => {
    // Clean undefined/empty string filters
    const params = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== undefined && v !== '')
    );
    const response = await api.get('/products', { params });
    return response.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    // Assuming backend returns a list of categories directly or inside content if paginated
    // Adjust if necessary
    if (response.data.content) {
        return response.data.content;
    }
    return response.data;
  },

  createProduct: async (productData: any, image: File): Promise<Product> => {
    const formData = new FormData();
    
    // Add product data as JSON Blob
    formData.append(
      'product', 
      new Blob([JSON.stringify(productData)], { type: 'application/json' })
    );
    
    // Add image file
    formData.append('image', image);

    const response = await api.post('/products', formData, {
      headers: {
        // Let the browser set the boundary for multipart/form-data
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
};
