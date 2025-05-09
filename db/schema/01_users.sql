-- Drop tables in proper dependency order
DROP TABLE IF EXISTS order_item, orders, menu_item, users CASCADE;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  contact_number VARCHAR(255) NOT NULL
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  total_price MONEY,
  ready_time TIMESTAMP,
  order_time TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE menu_item (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  photo_url TEXT,
  description TEXT,
  price MONEY
);

-- Order items    
CREATE TABLE order_item (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  menu_item_id INTEGER NOT NULL REFERENCES menu_item(id),
  quantity INTEGER,
  description TEXT
);



