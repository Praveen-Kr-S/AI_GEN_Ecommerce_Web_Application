import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Order, CustomerInfo } from '../types';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  orders: Order[];
  createOrder: (customer: CustomerInfo, paymentMethod?: string) => Order;
  lastOrder: Order | null;
  toasts: Toast[];
  dismissToast: (id: string) => void;
}

const CART_STORAGE_KEY = 'minishop_cart';
const ORDERS_STORAGE_KEY = 'minishop_orders';
const LAST_ORDER_KEY = 'minishop_last_order';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  // Initialize orders from localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse orders from localStorage', e);
      return [];
    }
  });

  // Track latest order for display on success page
  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Sync last order
  useEffect(() => {
    try {
      if (lastOrder) {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(lastOrder));
      } else {
        localStorage.removeItem(LAST_ORDER_KEY);
      }
    } catch (e) {
      console.error('Failed to save last order to localStorage', e);
    }
  }, [lastOrder]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
    showToast(`Added ${product.name.slice(0, 24)}... to cart!`);
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find((item) => item.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      showToast(`Removed from cart`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = Number(
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)
  );

  // Free shipping over $50, else $4.99 flat shipping
  const shipping = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 4.99;

  const total = Number((subtotal + shipping).toFixed(2));

  const createOrder = (customer: CustomerInfo, paymentMethod = 'Cash on Delivery / Card'): Order => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: `MS-${orderNumber}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal,
      shipping,
      total,
      customer,
      paymentMethod,
      status: 'Confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        total,
        orders,
        createOrder,
        lastOrder,
        toasts,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
