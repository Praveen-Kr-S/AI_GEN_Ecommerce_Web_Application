import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Sync state if URL query param changes
  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl && CATEGORIES.includes(catFromUrl as any)) {
      setSelectedCategory(catFromUrl);
    } else if (!catFromUrl) {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div id="products-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          All Products
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Explore our collection of everyday apparel, electronics, and lifestyle goods.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 mb-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="product-search-input"
              type="text"
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-8 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown & Product Count */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <label htmlFor="sort-dropdown" className="hidden sm:inline">Sort by:</label>
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-2 text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="default">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase()}`}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-6">
        <span>
          Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {(selectedCategory !== 'All' || searchQuery || sortBy !== 'default') && (
          <button
            onClick={handleClearFilters}
            className="text-amber-600 hover:text-amber-700 font-semibold underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white border border-neutral-200 rounded-xl">
          <div className="w-12 h-12 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">No products found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 mb-4">
            We couldn't find any products matching your current search or category filter.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      )}
    </div>
  );
};
