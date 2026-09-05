import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="minishop-footer" className="bg-neutral-900 text-neutral-300 mt-20 border-t border-neutral-800">
      {/* Value props bar */}
      <div className="border-b border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-800 text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Free Fast Shipping</h4>
                <p className="text-xs text-neutral-400">On all orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-800 text-amber-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">30-Day Easy Returns</h4>
                <p className="text-xs text-neutral-400">Hassle-free money back</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-800 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Safe Checkout</h4>
                <p className="text-xs text-neutral-400">Encrypted order security</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-800 text-amber-400">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Friendly Support</h4>
                <p className="text-xs text-neutral-400">Dedicated assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">MiniShop</span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Your neighborhood digital storefront for curated, modern everyday essentials. 
              Built for speed, simplicity, and a seamless shopping experience.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link to="/products?category=Electronics" className="hover:text-white transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=Fashion" className="hover:text-white transition-colors">Fashion</Link>
              </li>
              <li>
                <Link to="/products?category=Shoes" className="hover:text-white transition-colors">Shoes</Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="hover:text-white transition-colors">Accessories</Link>
              </li>
              <li>
                <Link to="/products?category=Home" className="hover:text-white transition-colors">Home & Living</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} MiniShop. All rights reserved.</p>
          <p>Designed for fast & reliable local shopping.</p>
        </div>
      </div>
    </footer>
  );
};
