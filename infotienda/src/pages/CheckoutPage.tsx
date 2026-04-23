import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiArrowLeft, FiMapPin, FiTruck, FiCreditCard } from 'react-icons/fi';

const ARGENTINA_PROVINCES = [
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán"
];

const CheckoutPage: React.FC = () => {
  const { cart, isLoading } = useCart();
  const navigate = useNavigate();
  
  const [deliveryMethod, setDeliveryMethod] = useState<'SHIPPING' | 'PICKUP'>('SHIPPING');
  
  const [shippingData, setShippingData] = useState({
    street: '',
    number: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Argentina',
    reference: ''
  });

  const [pickupData, setPickupData] = useState({
    pickupStoreName: 'Sucursal Centro Posadas',
    receiverName: ''
  });

  const [isSubmitting] = useState(false);
  const [error] = useState('');

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPickupData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let payload: any = { deliveryMethod };
    
    if (deliveryMethod === 'SHIPPING') {
      payload.shippingAddress = shippingData;
    } else {
      payload.pickupStoreName = pickupData.pickupStoreName;
      payload.receiverName = pickupData.receiverName;
    }

    // Por ahora no hace nada como fue solicitado
    console.log('Finalizar compra payload:', payload);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/cart')} className="text-gray-500 hover:text-blue-600 transition-colors">
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Method Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-2">
            <button
              onClick={() => setDeliveryMethod('SHIPPING')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all ${
                deliveryMethod === 'SHIPPING'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <FiTruck className="w-5 h-5" />
              Envío a domicilio
            </button>
            <button
              onClick={() => setDeliveryMethod('PICKUP')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all ${
                deliveryMethod === 'PICKUP'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <FiMapPin className="w-5 h-5" />
              Retiro en sucursal
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                {deliveryMethod === 'SHIPPING' ? <FiMapPin className="w-5 h-5" /> : <FiTruck className="w-5 h-5" />}
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {deliveryMethod === 'SHIPPING' ? 'Datos de Entrega' : 'Datos de Retiro'}
              </h2>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              {deliveryMethod === 'SHIPPING' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="street" className="text-sm font-semibold text-gray-700">Calle</label>
                      <input
                        required
                        type="text"
                        id="street"
                        name="street"
                        placeholder="Ej: San Martin"
                        value={shippingData.street}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="number" className="text-sm font-semibold text-gray-700">Número</label>
                      <input
                        required
                        type="text"
                        id="number"
                        name="number"
                        placeholder="Ej: 1234"
                        value={shippingData.number}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="apartment" className="text-sm font-semibold text-gray-700">Piso / Departamento (Opcional)</label>
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        placeholder="Ej: 2B"
                        value={shippingData.apartment}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="postalCode" className="text-sm font-semibold text-gray-700">Código Postal</label>
                      <input
                        required
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        placeholder="Ej: 3300"
                        value={shippingData.postalCode}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="city" className="text-sm font-semibold text-gray-700">Ciudad</label>
                      <input
                        required
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Ej: Posadas"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="state" className="text-sm font-semibold text-gray-700">Provincia</label>
                      <select
                        required
                        id="state"
                        name="state"
                        value={shippingData.state}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                      >
                        <option value="" disabled>Seleccionar provincia</option>
                        {ARGENTINA_PROVINCES.map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="reference" className="text-sm font-semibold text-gray-700">Referencia (Opcional)</label>
                    <textarea
                      id="reference"
                      name="reference"
                      placeholder="Ej: Porton negro, frente a la plaza"
                      value={shippingData.reference}
                      onChange={handleShippingChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="pickupStoreName" className="text-sm font-semibold text-gray-700">Sucursal de Retiro</label>
                    <select
                      required
                      id="pickupStoreName"
                      name="pickupStoreName"
                      value={pickupData.pickupStoreName}
                      onChange={handlePickupChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                    >
                      <option value="Sucursal Centro Posadas">Sucursal Centro Posadas (San Martín 1500)</option>
                      <option value="Sucursal Garupá">Sucursal Garupá (Ruta 12 km 8)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="receiverName" className="text-sm font-semibold text-gray-700">Nombre de quién retira</label>
                    <input
                      required
                      type="text"
                      id="receiverName"
                      name="receiverName"
                      placeholder="Ej: Eric Perez"
                      value={pickupData.receiverName}
                      onChange={handlePickupChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <FiTruck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Resumen de Envío</h2>
            </div>
            <div className="p-4 border-2 border-blue-500 bg-blue-50/50 rounded-xl flex items-center justify-between">
              <div>
                <span className="block font-bold text-gray-800 text-lg">
                  {deliveryMethod === 'SHIPPING' ? 'Envío Estándar' : 'Retiro Presencial'}
                </span>
                <span className="text-gray-500 text-sm">
                  {deliveryMethod === 'SHIPPING' ? 'Entrega en 3-5 días hábiles' : 'Disponible en 24hs hábiles'}
                </span>
              </div>
              <span className="font-bold text-emerald-600 text-lg">Gratis</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
            
            <div className="max-h-80 overflow-y-auto mb-6 pr-2 custom-scrollbar">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center p-1 border border-gray-100">
                    {item.productImageUrl ? (
                      <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <span className="text-[10px] text-gray-400">Sin imagen</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-800 truncate">{item.productName}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500 font-medium">Cant: {item.quantity}</span>
                      <span className="text-sm font-bold text-gray-900">
                        ${item.subTotal?.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span className="text-sm">Subtotal</span>
                <span className="font-semibold text-gray-800">
                  ${cart.totalPrice?.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-sm">Envío</span>
                <span className="text-emerald-600 font-bold">Gratis</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                <span className="text-gray-900 font-bold">Total</span>
                <span className="text-3xl font-black text-blue-600">
                  ${cart.totalPrice?.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <FiCreditCard className="w-5 h-5" />
                  Ir a pagar
                </>
              )}
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Transacción protegida por cifrado SSL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
