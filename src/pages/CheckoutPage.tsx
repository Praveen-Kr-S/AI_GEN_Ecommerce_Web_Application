import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerInfo } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shipping, total, createOrder } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash on Delivery (Pay upon arrival)');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
        <p className="text-neutral-500 text-sm mb-6">
          Add some items to your shopping cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerInfo]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Postal code / Pincode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Creates order, writes to localStorage, clears cart
      createOrder(formData, paymentMethod);
      setIsSubmitting(false);
      navigate('/order-success');
    }, 600);
  };

  return (
    <div id="checkout-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cart</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure SSL Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Shipping & Contact Details</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Where should we send your package?
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="customer-name"
                  className="block text-xs font-semibold text-neutral-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="customer-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 bg-neutral-50 border rounded-lg text-sm text-neutral-900 focus:outline-none focus:bg-white transition-colors ${
                    errors.name
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-neutral-300 focus:ring-1 focus:ring-neutral-900'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="customer-email"
                    className="block text-xs font-semibold text-neutral-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    name="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-neutral-50 border rounded-lg text-sm text-neutral-900 focus:outline-none focus:bg-white transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-300 focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label
                    htmlFor="customer-phone"
                    className="block text-xs font-semibold text-neutral-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-neutral-50 border rounded-lg text-sm text-neutral-900 focus:outline-none focus:bg-white transition-colors ${
                      errors.phone
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-300 focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label
                  htmlFor="customer-address"
                  className="block text-xs font-semibold text-neutral-700 mb-1"
                >
                  Street Address *
                </label>
                <textarea
                  id="customer-address"
                  name="address"
                  rows={2}
                  placeholder="Apartment, suite, unit, building, floor, street address..."
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 bg-neutral-50 border rounded-lg text-sm text-neutral-900 focus:outline-none focus:bg-white transition-colors ${
                    errors.address
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-neutral-300 focus:ring-1 focus:ring-neutral-900'
                  }`}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>

              {/* City and Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="customer-city"
                    className="block text-xs font-semibold text-neutral-700 mb-1"
                  >
                    City *
                  </label>
                  <input
                    id="customer-city"
                    type="text"
                    name="city"
                    placeholder="Seattle"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-neutral-50 border rounded-lg text-sm text-neutral-900 focus:outline-none focus:bg-white transition-colors ${
                      errors.city
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-300 focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label
                    htmlFor="customer-pincode"
                    className="block text-xs font-semibold text-neutral-700 mb-1"
                  >
                    Postal Code / Pincode *
                  </label>
                  <input
                    id="customer-pincode"
                    type="text"
                    name="pincode"
                    placeholder="98101"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-neutral-50 border rounded-lg text-sm text-neutral-900 focus:outline-none focus:bg-white transition-colors ${
                      errors.pincode
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-neutral-300 focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                  {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="pt-4 border-t border-neutral-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                Payment Option
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery (Pay upon arrival)"
                    checked={paymentMethod === 'Cash on Delivery (Pay upon arrival)'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-neutral-900 focus:ring-neutral-900"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-neutral-900 block">
                      Cash on Delivery / Card on Delivery
                    </span>
                    <span className="text-xs text-neutral-500">
                      Pay safely in cash or by contactless card when package is received.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border border-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Direct Instant Checkout (Demo/Test Mode)"
                    checked={paymentMethod === 'Direct Instant Checkout (Demo/Test Mode)'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-neutral-900 focus:ring-neutral-900"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-neutral-900 block">
                      Direct Instant Confirmation
                    </span>
                    <span className="text-xs text-neutral-500">
                      Instant simulated authorization without third-party gateways.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <button
              id="place-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Securing your order...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Place Order • ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Review Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-200">
              Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h2>

            {/* List of items */}
            <div className="max-h-72 overflow-y-auto space-y-3 pr-1 divide-y divide-neutral-200/60">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-white border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-2.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">Free</span>
                  ) : (
                    <span className="font-semibold text-neutral-900">${shipping.toFixed(2)}</span>
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-neutral-900">Total Due</span>
                <span className="text-xl font-extrabold text-neutral-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-[11px] text-neutral-500 space-y-1">
              <p className="font-semibold text-neutral-800">Guarantee:</p>
              <p>Your order details will be stored in your browser's local storage and can be reviewed anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
