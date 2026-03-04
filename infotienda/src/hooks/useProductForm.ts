import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { useDragAndDrop } from './useDragAndDrop';
import type { Category } from '../types/product';

export const useProductForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setErrorMsg('Error al cargar categorías');
    }
  };

  const handleImageDrop = (file: File) => {
    setSelectedImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const dragAndDropProps = useDragAndDrop({
    onDrop: handleImageDrop,
    accept: 'image/jpeg, image/png, image/webp',
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageDrop(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !price || !stockQuantity || !categoryId || !selectedImage) {
      setErrorMsg('Todos los campos excepto la descripción son obligatorios.');
      return;
    }

    setIsLoading(true);
    
    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        stockQuantity: parseInt(stockQuantity, 10),
        categoryId: parseInt(categoryId, 10)
      };

      await productService.createProduct(productData, selectedImage);
      
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      
      navigate('/'); 
    } catch (err: unknown) {
      console.error('Create product error', err);
      const apiError = err as { response?: { data?: { message?: string } } };
      setErrorMsg(apiError.response?.data?.message || 'Error al crear el producto. Verifica los datos.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    navigate,
    categories,
    isLoading,
    errorMsg,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    stockQuantity,
    setStockQuantity,
    categoryId,
    setCategoryId,
    fileInputRef,
    selectedImage,
    previewUrl,
    dragAndDropProps,
    onFileInputChange,
    removeImage,
    handleSubmit
  };
};
