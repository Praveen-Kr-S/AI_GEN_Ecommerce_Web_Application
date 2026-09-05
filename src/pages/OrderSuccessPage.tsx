import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Calendar, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderSuccessPage: React.FC = () => {
  const { lastOrder, orders } = useCart();

  // Use either the immediate last order or the most recent order from storage
  const order = lastOrder || (orders.length > 0 ? orders[0] : null);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">No recent order found</h2>
        <p className="text-neutral-500 text-sm mt-1 mb-6">
          Looks like you haven't placed an order recently in this browser session.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-xl text-sm font-semibold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const orderDateFormatted = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div id="order-success-page" className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Success banner */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Order Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-3">
          Thank you for your order!
        </h1>
        <p className="text-sm text-neutral-600 max-w-md mx-auto mt-2 leading-relaxed">
          We received your order and are getting it ready. A confirmation email has been dispatched to{' '}
          <strong className="text-neutral-900">{order.customer.email}</strong>.
        </p>
      </div>

      {/* Order Reference Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header with Order ID and Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-2">
          <div>
            <span className="text-xs text-neutral-400 font-medium">Order Reference</span>
            <div className="text-xl font-mono font-bold text-neutral-900 tracking-wide">
              {order.id}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Calendar className="w-4 h-4 text-neutral-400" />
            <span>{orderDateFormatted}</span>
          </div>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-neutral-100 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>Delivery Destination</span>
            </div>
            <p className="font-semibold text-neutral-800">{order.customer.name}</p>
            <p className="text-neutral-600">{order.customer.address}</p>
            <p className="text-neutral-600">
              {order.customer.city}, {order.customer.pincode}
            </p>
            <p className="text-neutral-500">Phone: {order.customer.phone}</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              <CreditCard className="w-3.5 h-3.5 text-neutral-500" />
              <span>Payment Details</span>
            </div>
            <p className="font-semibold text-neutral-800">{order.paymentMethod}</p>
            <p className="text-neutral-500">Status: <span className="text-emerald-600 font-semibold">{order.status}</span></p>
            <p className="text-neutral-500">Saved in browser localStorage</p>
          </div>
        </div>

        {/* Items list */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            Items Ordered ({order.items.reduce((s, i) => s + i.quantity, 0)})
          </h3>

          <div className="divide-y divide-neutral-100">
            {order.items.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-lg object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right font-bold text-sm text-neutral-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing breakdown */}
        <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs sm:text-sm text-neutral-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-neutral-900">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {order.shipping === 0 ? (
                <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
              ) : (
                <span className="font-semibold text-neutral-900">${order.shipping.toFixed(2)}</span>
              )}
            </span>
          </div>
          <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
            <span className="text-base font-bold text-neutral-900">Total Paid / Due</span>
            <span className="text-2xl font-extrabold text-neutral-900">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          id="order-success-continue-shopping"
          to="/products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-sm"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-semibold transition-all text-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};
