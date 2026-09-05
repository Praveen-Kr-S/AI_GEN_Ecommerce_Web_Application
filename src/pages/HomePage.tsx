import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <div id="home-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 text-amber-400 text-xs font-semibold border border-neutral-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Season Essentials Collection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Simple shopping. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">
                  Elevated essentials.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
                Discover everyday gear, electronics, apparel, and home goods crafted for lasting comfort and functional simplicity.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  id="hero-shop-now-btn"
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  id="hero-browse-categories-btn"
                  to="/products?category=Electronics"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 text-neutral-200 font-semibold transition-all"
                >
                  Explore Electronics
                </Link>
              </div>

              {/* Mini trust stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-neutral-800 text-left">
                <div>
                  <span className="text-xl font-bold text-white block">15+</span>
                  <span className="text-xs text-neutral-400">Curated Items</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white block">Free</span>
                  <span className="text-xs text-neutral-400">Shipping over $50</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white block">100%</span>
                  <span className="text-xs text-neutral-400">Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-neutral-800/80 rounded-2xl p-4 border border-neutral-700 shadow-2xl backdrop-blur-sm">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-neutral-900 relative">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="Featured Headphone"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-900/90 text-amber-400 text-xs font-bold px-3 py-1 rounded-md border border-neutral-700">
                    Featured Pick
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white text-base">AuraStudio Headphones</h3>
                    <p className="text-xs text-neutral-400">Active Noise Cancellation</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 line-through block">$199.99</span>
                    <span className="text-base font-bold text-amber-400">$149.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Navigation */}
      <section className="py-12 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Shop by Category</h2>
              <p className="text-sm text-neutral-500">Quickly jump to what you are looking for</p>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold text-neutral-800 hover:text-amber-600 flex items-center gap-1 group"
            >
              <span>View all categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORIES.filter((cat) => cat !== 'All').map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="group p-4 rounded-xl border border-neutral-200 hover:border-neutral-900 bg-neutral-50/50 hover:bg-neutral-900 text-neutral-900 hover:text-white transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-400">
                    Department
                  </span>
                  <h3 className="text-base font-bold mt-1">{cat}</h3>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-medium text-neutral-500 group-hover:text-amber-400">
                  <span>Browse items</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Handpicked for you</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link
              id="featured-see-all-link"
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-amber-600 transition-colors"
            >
              <span>See full catalog ({PRODUCTS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
