import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  const isInCart = cart.some((item) => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col hover:border-neutral-300 hover:shadow-md transition-all duration-200"
    >
      {/* Image container */}
      <Link
        to={`/product/${product.id}`}
        className="relative block w-full aspect-square bg-neutral-100 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-neutral-800 text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
          {product.category}
        </span>
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-xs">
            Save ${(product.originalPrice - product.price).toFixed(0)}
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-neutral-600 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
            </div>
            <span className="font-semibold text-neutral-900">{product.rating}</span>
            <span className="text-neutral-400">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-semibold text-neutral-900 line-clamp-2 hover:text-amber-600 transition-colors mb-2"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="pt-3 mt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-lg font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="block text-xs text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{isInCart ? 'Add More' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
