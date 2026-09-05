export interface Product {
  id: string;
  name: string;
  category: 'Electronics' | 'Fashion' | 'Shoes' | 'Accessories' | 'Home';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  features?: string[];
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: CustomerInfo;
  paymentMethod: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
}
