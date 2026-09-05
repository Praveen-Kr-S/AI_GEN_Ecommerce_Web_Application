import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Menu, X, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { cartCount } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header id="minishop-navbar" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            id="nav-logo-link"
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-sm group-hover:bg-neutral-800 transition-colors">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">
                Mini<span className="text-amber-500">Shop</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">
                Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              id="nav-home-link"
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-neutral-100 text-neutral-900 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              Home
            </Link>
            <Link
              id="nav-products-link"
              to="/products"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/products')
                  ? 'bg-neutral-100 text-neutral-900 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              All Products
            </Link>
          </nav>

          {/* Right Actions: Cart & Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              id="nav-cart-btn"
              to="/cart"
              className="relative p-2.5 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all flex items-center justify-center text-neutral-800"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="nav-cart-badge"
                  className="absolute -top-1.5 -right-1.5 bg-neutral-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="nav-mobile-drawer" className="md:hidden border-t border-neutral-200 bg-white px-4 py-3 space-y-2">
          <Link
            id="mobile-nav-home"
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') && location.pathname === '/'
                ? 'bg-neutral-100 text-neutral-900 font-semibold'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            Home
          </Link>
          <Link
            id="mobile-nav-products"
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/products')
                ? 'bg-neutral-100 text-neutral-900 font-semibold'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            All Products
          </Link>
          <Link
            id="mobile-nav-cart"
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:bg-neutral-50"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              View Cart
            </span>
            <span className="bg-neutral-900 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount} items
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};
