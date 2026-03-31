import { fetchClient } from './api';
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
    const params = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== undefined && v !== '')
    ) as Record<string, string>;
    
    const searchParams = new URLSearchParams(params);
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';

    const responseData = await fetchClient(endpoint);
    return responseData;
  },

  getCategories: async (): Promise<Category[]> => {
    const responseData = await fetchClient('/categories');
    if (responseData.content) {
        return responseData.content;
    }
    return responseData;
  },

  getProductById: async (id: string | number): Promise<Product> => {
    return fetchClient(`/products/${id}`);
  },

  createProduct: async (productData: any, image: File): Promise<Product> => {
    const formData = new FormData();
    
    formData.append(
      'product', 
      new Blob([JSON.stringify(productData)], { type: 'application/json' })
    );
    
    formData.append('image', image);

    const responseData = await fetchClient('/products', {
      method: 'POST',
      body: formData,
    });
    
    return responseData;
  }
};
