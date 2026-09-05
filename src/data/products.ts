import { Product } from '../types';

export const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Shoes', 'Accessories', 'Home'] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'AuraStudio Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Immerse yourself in rich, high-fidelity audio with active noise cancellation, 40-hour battery life, and ultra-plush memory foam earcups designed for all-day comfort.',
    inStock: true,
    isFeatured: true,
    features: [
      'Active Noise Cancellation (ANC)',
      '40-hour ultra-long battery life with fast charge',
      'Lossless Bluetooth 5.3 multi-device connectivity',
      'Built-in dual beamforming microphones for crystal-clear calls'
    ]
  },
  {
    id: 'prod-2',
    name: 'Chronos Smart Watch & Health Tracker',
    category: 'Electronics',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviewsCount: 218,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Track workouts, heart rate, sleep cycles, and daily steps on a crisp 1.43-inch AMOLED display with a waterproof aerospace-grade aluminum chassis.',
    inStock: true,
    isFeatured: true,
    features: [
      'Vibrant AMOLED always-on touchscreen',
      'Continuous heart rate and SpO2 monitoring',
      '5ATM water resistance up to 50 meters',
      'Up to 10 days battery life on a single charge'
    ]
  },
  {
    id: 'prod-3',
    name: 'KeyCraft Retro Mechanical Keyboard',
    category: 'Electronics',
    price: 79.50,
    originalPrice: 95.00,
    rating: 4.9,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    description: 'Tactile hot-swappable mechanical switches with pre-lubed stabilizers, PBT doubleshot keycaps, and customizable white backlighting for productive typing.',
    inStock: true,
    isFeatured: false,
    features: [
      'Hot-swappable tactile mechanical switches',
      'Premium sound-dampening silicone foam layers',
      'Dual mode: USB-C wired & low-latency wireless',
      'Mac and Windows keycaps included'
    ]
  },
  {
    id: 'prod-4',
    name: 'Vintage Wash Denim Trucker Jacket',
    category: 'Fashion',
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.7,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from 100% heavyweight cotton denim with vintage wash detailing. Features buttoned chest flap pockets and adjustable waist tabs for a timeless silhouette.',
    inStock: true,
    isFeatured: true,
    features: [
      '100% durable heavyweight ring-spun cotton',
      'Antique brass button closures',
      'Double-needle reinforced seam stitching',
      'Relaxed modern tailored fit'
    ]
  },
  {
    id: 'prod-5',
    name: 'Organic Heavyweight Fleece Hoodie',
    category: 'Fashion',
    price: 54.00,
    rating: 4.5,
    reviewsCount: 97,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Super soft 450 GSM French Terry fleece made from certified organic cotton. Features a generous double-lined hood, ribbed cuffs, and a kangaroo pouch.',
    inStock: true,
    isFeatured: false,
    features: [
      '450 GSM organic French terry cotton',
      'Pre-shrunk fabric to retain shape and softness',
      'Double-lined cozy hood without scratchy tags',
      'Deep kangaroo pocket for essentials'
    ]
  },
  {
    id: 'prod-6',
    name: 'Breathable Pure Linen Casual Shirt',
    category: 'Fashion',
    price: 48.00,
    originalPrice: 60.00,
    rating: 4.6,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    description: 'Lightweight and naturally cooling, this 100% European flax linen shirt is ideal for warmer days and easy casual layering.',
    inStock: true,
    isFeatured: false,
    features: [
      '100% sustainably grown European flax',
      'Natural temperature regulation and airflow',
      'Mother-of-pearl buttons',
      'Soft enzyme washed for broken-in comfort'
    ]
  },
  {
    id: 'prod-7',
    name: 'Velocity Red Cushioned Running Shoes',
    category: 'Shoes',
    price: 119.00,
    originalPrice: 145.00,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'High-rebound responsive foam sole engineered for maximum energy return and breathability during marathon training and daily city runs.',
    inStock: true,
    isFeatured: true,
    features: [
      'Ultra-responsive nitrogen-infused foam midsole',
      'Engineered jacquard mesh upper for airflow',
      'High-abrasion rubber outsole with multi-directional grip',
      'Reflective heel accents for nighttime safety'
    ]
  },
  {
    id: 'prod-8',
    name: 'Heritage Handcrafted Leather Oxford Shoes',
    category: 'Shoes',
    price: 135.00,
    originalPrice: 170.00,
    rating: 4.8,
    reviewsCount: 115,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    description: 'Full-grain calfskin leather with Goodyear-welted construction and a cushioned leather insole that molds comfortably to your feet over time.',
    inStock: true,
    isFeatured: false,
    features: [
      'Full-grain burnished calfskin leather',
      'Goodyear welt construction for easy resoling',
      'Leather lining with memory foam arch support',
      'Stacked leather heel with non-slip rubber tap'
    ]
  },
  {
    id: 'prod-9',
    name: 'AeroGrid All-Terrain Sport Sneakers',
    category: 'Shoes',
    price: 92.00,
    rating: 4.5,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    description: 'A versatile hybrid trail-and-street sneaker featuring weather-resistant ripstop panels, quick-lace drawstring, and sticky lugged traction.',
    inStock: true,
    isFeatured: false,
    features: [
      'Reinforced water-repellent ripstop textile',
      'Quick-pull elastic toggle lacing system',
      'Anti-torsion stability shank in arch',
      'Deep 4mm lugged rubber tread'
    ]
  },
  {
    id: 'prod-10',
    name: 'Full-Grain Slim Leather Wallet',
    category: 'Accessories',
    price: 34.99,
    originalPrice: 45.00,
    rating: 4.7,
    reviewsCount: 265,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-stitched slim bifold wallet made from vegetable-tanned leather. Holds up to 10 cards and folded bills with built-in RFID blocking shield.',
    inStock: true,
    isFeatured: false,
    features: [
      'Vegetable-tanned full-grain leather',
      'RFID-blocking inner lining to protect cards',
      'Holds 8-10 cards plus folded currency',
      'Ultra-thin 9mm profile prevents pocket bulge'
    ]
  },
  {
    id: 'prod-11',
    name: 'Polarized Matte Gold Aviator Sunglasses',
    category: 'Accessories',
    price: 42.00,
    rating: 4.6,
    reviewsCount: 132,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless tear-drop aviator design with lightweight stainless steel frame, non-slip silicone nose pads, and UV400 polarized scratch-resistant lenses.',
    inStock: true,
    isFeatured: true,
    features: [
      '100% UV400 protection against UVA/UVB rays',
      'Glare-reducing TAC polarized lenses',
      'Corrosion-resistant titanium-alloy frame',
      'Includes hard shell case and microfiber cloth'
    ]
  },
  {
    id: 'prod-12',
    name: 'Heritage Waxed Canvas Travel Duffle',
    category: 'Accessories',
    price: 88.00,
    originalPrice: 110.00,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Rugged 18oz water-resistant waxed canvas with genuine brass hardware and leather carry handles. 42-liter capacity meets standard airline carry-on requirements.',
    inStock: true,
    isFeatured: false,
    features: [
      'Heavy-duty 18oz weather-resistant waxed canvas',
      'Detachable padded shoulder strap with brass clips',
      'Dedicated zippered shoe compartment',
      'TSA carry-on approved dimensions'
    ]
  },
  {
    id: 'prod-13',
    name: 'Artisan Ceramic Pour-Over Coffee Dripper',
    category: 'Home',
    price: 29.50,
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-thrown stoneware ceramic cone designed with internal spiral ribs to extract optimal sweet notes and clean body from your favorite specialty coffee beans.',
    inStock: true,
    isFeatured: false,
    features: [
      'Dense heat-retaining ceramic stoneware',
      'Engineered internal extraction spirals',
      'Compatible with standard V60-02 paper filters',
      'Dishwasher safe and food-grade glaze'
    ]
  },
  {
    id: 'prod-14',
    name: 'Nordic Matte Minimalist Desk Lamp',
    category: 'Home',
    price: 64.00,
    originalPrice: 79.00,
    rating: 4.7,
    reviewsCount: 144,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek architectural desk lamp with touch-sensitive dimming, 3 color temperature modes, and an energy-efficient warm LED glow that prevents eye strain.',
    inStock: true,
    isFeatured: true,
    features: [
      'Touch dimming with 3 color temperatures (3000K-6000K)',
      'Flicker-free eye-care diffuser panel',
      'Weighted metal base with 360-degree swivel arm',
      'Integrated 10W USB charging output port'
    ]
  },
  {
    id: 'prod-15',
    name: 'Cedarwood & Wild Fig Botanical Candle',
    category: 'Home',
    price: 22.00,
    rating: 4.9,
    reviewsCount: 275,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-poured 100% natural soy wax scented with pure essential oils of smoky cedar, ripe Mediterranean fig, and earthy amber in an amber glass jar.',
    inStock: true,
    isFeatured: false,
    features: [
      '100% natural American-grown soy wax',
      'Clean-burning lead-free cotton wick',
      '55+ hours estimated clean burn time',
      'Reusable amber glass apothecary vessel'
    ]
  }
];
