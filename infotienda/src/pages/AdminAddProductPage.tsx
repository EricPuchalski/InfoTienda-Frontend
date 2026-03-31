import React from 'react';
import { useProductForm } from '../hooks/useProductForm';
import { FiUploadCloud, FiArrowLeft, FiPlus, FiImage, FiTrash2 } from 'react-icons/fi';

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
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-4 group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver atrás
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Agregar Nuevo Producto
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Completa la información a continuación para publicar un nuevo producto en la tienda.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="p-8 sm:p-10">

        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column - Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Producto</label>
                <input 
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                  placeholder="Ej: Teclado Mecánico RGB"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={5}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none placeholder-gray-400"
                  placeholder="Escribe una descripción detallada que resalte las características del producto..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Precio de Venta ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-semibold">$</span>
                    </div>
                    <input 
                      type="number"
                      step="0.01"
                      min="0"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-5 py-3 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-medium"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stock Inicial</label>
                  <input 
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={e => setStockQuantity(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-medium"
                    placeholder="Ej: 50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Categoría</label>
                <select
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-gray-400">Seleccione una categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="text-gray-900">{cat.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  {/* The select caret is natively rendered, but we used appearance-none. So let's add a custom arrow next if needed. Or let's not use appearance-none if we want native arrow. I'll remove appearance-none from the replacement. */}
                </div>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="lg:col-span-5 flex flex-col">
              <label className="block text-sm font-bold text-gray-700 mb-2">Imagen del Producto</label>
              
              <div 
                {...dropzoneProps}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer flex-1 min-h-[300px] overflow-hidden group
                  ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 bg-gray-50/50'}
                  ${previewUrl ? 'border-transparent p-0 bg-gray-900 group-hover:border-transparent' : ''}
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
                  <div className="absolute inset-0 w-full h-full">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-40" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                      <FiImage className="text-white/80 w-10 h-10 mb-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
                        className="bg-red-500/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Eliminar imagen
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-colors duration-300
                      ${isDragging ? 'bg-blue-200 text-blue-600' : 'bg-white text-blue-500 shadow-sm group-hover:shadow-md'}
                    `}>
                      <FiUploadCloud className="w-10 h-10" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {isDragging ? 'Suelta la imagen aquí' : 'Sube una imagen'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 px-4">
                      Arrastra y suelta tu archivo aquí, o haz clic para buscar en tu dispositivo
                    </p>
                    <div className="inline-flex items-center justify-center px-4 py-2 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium transition-colors group-hover:bg-blue-100">
                      Explorar archivos
                    </div>
                    <p className="text-[0.7rem] text-gray-400 mt-6 md:mt-auto pt-4 uppercase tracking-wider font-semibold">
                      Formatos soportados: JPG, PNG, WEBP (Máx. 5MB)
                    </p>
                  </div>
                )}
              </div>
              
              {dropError && (
                 <p className="text-red-500 text-sm font-medium mt-3 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    {dropError}
                 </p>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 mt-10 flex flex-col-reverse sm:flex-row justify-end gap-4 bg-gray-50/50 -mx-8 -mb-8 sm:-mx-10 sm:-mb-10 p-6 sm:p-8 rounded-b-2xl">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="px-6 py-3.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 bg-gray-100 transition-colors w-full sm:w-auto text-center"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading || !selectedImage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <FiPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Publicar Producto</span>
                </>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProductPage;
