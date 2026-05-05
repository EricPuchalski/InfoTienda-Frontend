import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cartService } from '../services/cartService';
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
  const { cart, isLoading: isCartLoading } = useCart();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, isAuthLoading, navigate, location]);

  const [deliveryMethod, setDeliveryMethod] = useState<'SHIPPING' | 'PICKUP'>('SHIPPING');
  const [paymentMethod, setPaymentMethod] = useState<'MERCADO_PAGO' | 'CREDIT_CARD' | 'CASH'>('MERCADO_PAGO');
  
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const payload: any = { 
        deliveryMethod,
        paymentMethod
      };
      
      if (deliveryMethod === 'SHIPPING') {
        payload.shippingAddress = shippingData;
      } else {
        payload.pickupStoreName = pickupData.pickupStoreName;
        payload.receiverName = pickupData.receiverName;
      }

      const response = await cartService.checkout(payload);
      
      if (response.mercadoPagoInitPoint) {
        // Redirigir al checkout de Mercado Pago
        window.location.href = response.mercadoPagoInitPoint;
      } else {
        throw new Error('No se recibió el punto de inicio de Mercado Pago');
      }
    } catch (err: any) {
      setError(err.message || 'Hubo un error al procesar tu pedido. Intenta nuevamente.');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (isCartLoading || isAuthLoading) {
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => step === 1 ? navigate('/cart') : setStep(1)} 
            className="text-gray-500 hover:text-blue-600 transition-colors bg-white p-2 rounded-full shadow-sm border border-gray-100"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
            <p className="text-gray-500 text-sm">Paso {step} de 2: {step === 1 ? 'Método de Entrega' : 'Método de Pago'}</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2">
          <div className={`h-2 w-16 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`h-2 w-16 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 ? (
            <>
              {/* Delivery Method Selection */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-2">
                <button
                  type="button"
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
                  type="button"
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
            </>
          ) : (
            /* Payment Method Selection */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <FiCreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Selecciona el Método de Pago</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('MERCADO_PAGO')}
                  className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'MERCADO_PAGO'
                      ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="w-32 h-10 flex items-center justify-center">
                    <img 
                      src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-1.png" 
                      alt="Mercado Pago" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <span className={`font-bold text-sm ${paymentMethod === 'MERCADO_PAGO' ? 'text-blue-600' : 'text-gray-500'}`}>
                    Mercado Pago
                  </span>
                </button>

                <button
                  type="button"
                  disabled
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-gray-50 bg-gray-50/50 cursor-not-allowed opacity-60"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <FiCreditCard className="w-6 h-6 text-gray-400" />
                  </div>
                  <span className="font-bold text-sm text-gray-400">Tarjeta (Próximamente)</span>
                </button>

                <button
                  type="button"
                  disabled
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-gray-50 bg-gray-50/50 cursor-not-allowed opacity-60"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xl font-bold text-gray-400">$</span>
                  </div>
                  <span className="font-bold text-sm text-gray-400">Efectivo (Próximamente)</span>
                </button>
              </div>

              <form id="checkout-form" onSubmit={handleSubmit} className="hidden">
                {/* Form placeholder to keep single submission logic */}
              </form>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium animate-fadeIn">
              {error}
            </div>
          )}
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
                  {step === 1 ? 'Continuar al pago' : 'Ir a pagar'}
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
