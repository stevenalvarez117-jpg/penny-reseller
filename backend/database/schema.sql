-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  user_type VARCHAR(50) NOT NULL, -- 'reseller' or 'shopper'
  profile_photo_url VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  store VARCHAR(50), -- 'walmart', 'lowes', 'home_depot'
  original_price DECIMAL(10, 2),
  current_price DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2),
  image_url VARCHAR(500),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_scanned TIMESTAMP
);

-- Inventory table
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  reseller_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  purchase_price DECIMAL(10, 2),
  purchase_date DATE,
  status VARCHAR(50), -- 'pending', 'listed', 'sold', 'returned'
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Listings table
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  inventory_id INTEGER NOT NULL REFERENCES inventory(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  channel VARCHAR(50), -- 'amazon', 'ebay', 'penny_reseller_marketplace'
  external_listing_id VARCHAR(255),
  current_price DECIMAL(10, 2),
  quantity INTEGER,
  status VARCHAR(50), -- 'active', 'sold', 'delisted'
  synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales table
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL REFERENCES listings(id),
  inventory_id INTEGER NOT NULL REFERENCES inventory(id),
  quantity_sold INTEGER,
  sale_price DECIMAL(10, 2),
  total_amount DECIMAL(10, 2),
  channel VARCHAR(50),
  order_id VARCHAR(255),
  buyer_id INTEGER REFERENCES users(id),
  sold_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Price history table
CREATE TABLE price_history (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  store_price DECIMAL(10, 2),
  retail_price DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alerts table
CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  store VARCHAR(50),
  category VARCHAR(100),
  min_discount_threshold DECIMAL(5, 2),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_store ON products(store);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_inventory_reseller ON inventory(reseller_id);
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_listings_channel ON listings(channel);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_sales_listing ON sales(listing_id);
CREATE INDEX idx_price_history_product ON price_history(product_id);
CREATE INDEX idx_alerts_user ON alerts(user_id);
