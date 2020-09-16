

CREATE TABLE IF NOT EXISTS users(
  user_id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  email TEXT
);

CREATE TABLE IF NOT EXISTS merchant(
  merchant_id SERIAL PRIMARY KEY,
  name TEXT,
  password TEXT,
  email TEXT,
  address TEXT,
  uen TEXT,
  cuisine TEXT
);

CREATE TABLE  IF NOT EXISTS category(
  category_id SERIAL PRIMARY KEY,
  category_name TEXT
);

CREATE TABLE IF NOT EXISTS receipt(
  receipt_id SERIAL PRIMARY KEY,
  user_id INTEGER,
  merchant_id INTEGER,
  date_created TIMESTAMP default now()
);

CREATE TABLE IF NOT EXISTS listing(
  listing_id SERIAL PRIMARY KEY,
  item_name TEXT,
  unit_price INTEGER,
  quantity INTEGER,
  price_ceiling INTEGER,
  price_floor INTEGER,
  category_id INTEGER,
  merchant_id INTEGER,
  description TEXT,
  time_limit_min INTEGER,
  live BOOLEAN
);

CREATE TABLE IF NOT EXISTS orders(
  order_id SERIAL PRIMARY KEY,
  receipt_id INTEGER,
  listing_id INTEGER,
  price INTEGER,
  quantity INTEGER,
  revenue INTEGER,
  date_created TIMESTAMP default now()

);