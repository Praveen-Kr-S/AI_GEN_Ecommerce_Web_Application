import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Check, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-neutral-900">Product Not Found</h2>
        <p className="text-neutral-500 mt-2 mb-6">
          The item you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div id="product-details-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
        <Link to="/" className="hover:text-neutral-900">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-neutral-900">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-neutral-900">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 mb-6 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to results</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Large Product Image */}
        <div className="lg:col-span-6">
          <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-neutral-900 text-xs font-bold px-3 py-1 rounded-md shadow-xs">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Information */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Rating and Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                <span className="ml-1 text-sm font-bold text-neutral-900">{product.rating}</span>
              </div>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs text-neutral-500 font-medium">
                {product.reviewsCount} customer reviews
              </span>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                In Stock
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline gap-3 py-2">
              <span className="text-3xl font-extrabold text-neutral-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-600 leading-relaxed pt-2 border-t border-neutral-100">
              {product.description}
            </p>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                  Key Features
                </h3>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Box */}
          <div className="pt-6 mt-6 border-t border-neutral-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-neutral-50 h-11">
                <button
                  id="qty-decrease-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-3.5 py-2 text-neutral-600 hover:bg-neutral-200 disabled:opacity-40 transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span
                  id="qty-display"
                  className="w-12 text-center text-sm font-semibold text-neutral-900 select-none"
                >
                  {quantity}
                </span>
                <button
                  id="qty-increase-btn"
                  onClick={() => handleQuantityChange(1)}
                  className="px-3.5 py-2 text-neutral-600 hover:bg-neutral-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                id="details-add-to-cart-btn"
                onClick={handleAddToCart}
                className={`flex-1 h-11 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  addedNotice
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm'
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added {quantity} to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Micro guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-neutral-500">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Free delivery on orders $50+</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">
            Similar in {product.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
