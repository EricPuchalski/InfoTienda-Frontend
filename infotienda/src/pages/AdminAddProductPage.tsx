import React from 'react';
import { useProductForm } from '../hooks/useProductForm';

const AdminAddProductPage: React.FC = () => {
  const {
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
  } = useProductForm();
  
  const { isDragging, error: dropError, dropzoneProps } = dragAndDropProps;


  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-100">
          Agregar Nuevo Producto
        </h1>

        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Details */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Producto</label>
                <input 
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Ej: Teclado Mecánico"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="Descripción detallada del producto..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Precio ($)</label>
                  <input 
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                  <input 
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={e => setStockQuantity(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
                <select
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  required
                >
                  <option value="" disabled>Seleccione una categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen del Producto</label>
              
              <div 
                {...dropzoneProps}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all cursor-pointer h-64
                  ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50/50'}
                  ${previewUrl ? 'border-none p-0 bg-transparent' : ''}
                `}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/jpeg, image/png, image/webp"
                  onChange={onFileInputChange}
                />
                
                {previewUrl ? (
                  <div className="relative w-full h-full group rounded-xl overflow-hidden border border-gray-200">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain bg-white" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors shadow-lg"
                      >
                        Quitar Imagen
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Haz click para buscar o</p>
                    <p className="text-[0.8rem] text-gray-500 mt-1">arrastra tu imagen aquí</p>
                    <p className="text-[0.7rem] text-gray-400 mt-3">JPG, PNG o WEBP (Máx. 5MB)</p>
                  </div>
                )}
              </div>
              
              {dropError && (
                 <p className="text-red-500 text-xs mt-2">{dropError}</p>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4 mt-8">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading || !selectedImage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading && (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? 'Guardando...' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProductPage;
