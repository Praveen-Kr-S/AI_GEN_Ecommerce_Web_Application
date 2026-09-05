import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div id="cart-empty-view" className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-5">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-neutral-500 max-w-sm mx-auto text-sm mb-8 leading-relaxed">
          Looks like you haven't added any essentials to your shopping cart yet.
        </p>
        <Link
          id="cart-start-shopping-btn"
          to="/products"
          className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div id="cart-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Review your chosen items before proceeding to checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-neutral-500 hover:text-red-600 transition-colors"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Progress Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <Truck className="w-5 h-5 text-amber-700 shrink-0" />
            <div className="flex-1 text-xs sm:text-sm text-amber-900">
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-bold">${remainingForFreeShipping.toFixed(2)}</strong> more to unlock <strong>Free Standard Shipping</strong>!
                </span>
              ) : (
                <span className="font-semibold text-emerald-800">
                  🎉 You qualify for FREE Standard Delivery!
                </span>
              )}
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl divide-y divide-neutral-100 overflow-hidden shadow-xs">
            {cart.map((item) => (
              <div
                key={item.product.id}
                id={`cart-item-${item.product.id}`}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-neutral-50/50 transition-colors"
              >
                {/* Thumbnail */}
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {item.product.category}
                  </span>
                  <Link
                    to={`/product/${item.product.id}`}
                    className="block font-semibold text-neutral-900 hover:text-amber-600 text-sm sm:text-base truncate transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>

                {/* Quantity Controls & Line total */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 mt-2 sm:mt-0">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                    <button
                      id={`cart-decrease-${item.product.id}`}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 sm:p-2 text-neutral-600 hover:bg-neutral-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span
                      id={`cart-qty-${item.product.id}`}
                      className="w-8 sm:w-10 text-center text-xs sm:text-sm font-semibold text-neutral-900"
                    >
                      {item.quantity}
                    </span>
                    <button
                      id={`cart-increase-${item.product.id}`}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 sm:p-2 text-neutral-600 hover:bg-neutral-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-sm sm:text-base font-bold text-neutral-900 block">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove button */}
                  <button
                    id={`cart-remove-${item.product.id}`}
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label={`Remove ${item.product.name} from cart`}
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/products"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5"
            >
              <span>← Continue Browsing Products</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-semibold uppercase text-xs">FREE</span>
                  ) : (
                    <span className="font-semibold text-neutral-900">${shipping.toFixed(2)}</span>
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex justify-between items-baseline">
                <span className="text-base font-bold text-neutral-900">Total</span>
                <span className="text-2xl font-extrabold text-neutral-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              id="cart-checkout-btn"
              onClick={() => navigate('/checkout')}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure 256-Bit Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
