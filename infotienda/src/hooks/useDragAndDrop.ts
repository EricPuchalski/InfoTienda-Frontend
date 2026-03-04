import { useState, useCallback } from 'react';

interface UseDragAndDropOptions {
  onDrop?: (file: File) => void;
  accept?: string;
  maxSize?: number; // bytes
}

export const useDragAndDrop = ({ onDrop, accept = 'image/*', maxSize = 5 * 1024 * 1024 }: UseDragAndDropOptions = {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const validateFile = (file: File): boolean => {
    setError(null);
    if (accept && accept !== '*') {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.replace('/*', '/'));
        }
        return file.type === type || file.name.endsWith(type);
      });
      if (!isAccepted) {
        setError('El tipo de archivo no está permitido.');
        return false;
      }
    }

    if (maxSize && file.size > maxSize) {
      setError(`El archivo es demasiado grande. El máximo permitido es ${Math.round(maxSize / 1024 / 1024)}MB.`);
      return false;
    }

    return true;
  };

  const processFile = useCallback((file: File | null | undefined) => {
    if (file && validateFile(file)) {
      onDrop?.(file);
    }
  }, [onDrop, accept, maxSize]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  return {
    isDragging,
    error,
    dropzoneProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
    handleFileInput,
  };
};
