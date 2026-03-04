import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import type { Product, Category } from '../types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [page, setPage] = useState(0);
  const size = 12; 
  const [sortBy, setSortBy] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [name, setName] = useState('');
  const [categoryName, setCategoryName] = useState<string | undefined>(undefined);
  const [totalPages, setTotalPages] = useState(0);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, size, sortBy, sortDir, name, categoryName]);

  const fetchCategories = async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({
        page,
        size,
        sortBy,
        sortDir,
        active: true, 
        minStock: 0,
        name: name || undefined,
        categoryName: categoryName || undefined
      });
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (searchInput: string) => {
    setName(searchInput);
    setPage(0); 
  };

  const handleCategorySelect = (catName: string) => {
    setCategoryName(catName === '' ? undefined : catName);
    setPage(0);
  };

  return {
    products,
    categories,
    loading,
    page,
    setPage,
    totalPages,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    categoryName,
    name,
    handleCategorySelect,
    handleSearchSubmit,
  };
};
