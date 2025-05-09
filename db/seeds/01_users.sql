

INSERT INTO users (name, contact_number)
VALUES
  ('John Doe', '123-456-7890'),
  ('Jane Smith', '987-654-3210'),
  ('Alice Johnson', '555-555-5555'),
  ('Bob Lee', '444-444-4444'),
  ('Charlie Brown', '333-333-3333');

INSERT INTO menu_item (name, photo_url, description, price, is_active, processing_time)
VALUES
  ('Salad', 'https://marathonmouth.me/wp-content/uploads/2021/07/community-foods-8.jpg?w=1024', 'Fresh garden salad with dressing', 5.75, true, 10),
  ('Pasta', 'https://pngimg.com/d/pasta_PNG70.png', 'Spaghetti with tomato basil sauce', 10.25, true, 20),
  ('Garlic Bread', 'https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-garlic-bread-concepts-png-image_12638044.png', 'Toasted garlic bread slices', 3.50, true, 5),
  ('Soda', 'https://banner2.cleanpng.com/20180716/bwu/aavh2vvhd.webp', 'Chilled soft drink can', 1.99, true, 5),
  ('Burger', 'https://e7.pngegg.com/pngimages/201/77/png-clipart-delicious-beef-burger-delicious-beef-burger-tomato-thumbnail.png', 'Delicious beef burger filled with goodness!', 1.68, true, 30);

  ('Salad', 'https://example.com/salad.jpg', 'Fresh garden salad with dressing', 5.75, true, 10),
  ('Pasta', 'https://example.com/pasta.jpg', 'Spaghetti with tomato basil sauce', 10.25, true, 20),
  ('Garlic Bread', 'https://example.com/garlic_bread.jpg', 'Toasted garlic bread slices', 3.50, true, 5),
  ('Soda', 'https://example.com/soda.jpg', 'Chilled soft drink can', 1.99, true,5);

  ('Salad', 'https://marathonmouth.me/wp-content/uploads/2021/07/community-foods-8.jpg?w=1024', 'Fresh garden salad with dressing', 5.75),
  ('Pasta', 'https://pngimg.com/d/pasta_PNG70.png', 'Spaghetti with tomato basil sauce', 10.25),
  ('Garlic Bread', 'https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-garlic-bread-concepts-png-image_12638044.png', 'Toasted garlic bread slices', 3.50),
  ('Soda', 'https://banner2.cleanpng.com/20180716/bwu/aavh2vvhd.webp', 'Chilled soft drink can', 1.99),
  ('Burger', 'https://e7.pngegg.com/pngimages/201/77/png-clipart-delicious-beef-burger-delicious-beef-burger-tomato-thumbnail.png', 'Delicious beef burger filled with goodness!', 1.68);


INSERT INTO orders (user_id, total_price, ready_time, order_time)
VALUES
  (1, 21.75, '2025-05-05 16:30:00', '2025-05-05 16:00:00'), -- 2x Salad + 1x Pasta
  (2, 3.50,  '2025-05-05 17:00:00', '2025-05-05 16:45:00'), -- 1x Garlic Bread
  (3, 3.98,  '2025-05-06 12:30:00', '2025-05-06 12:00:00'), -- 2x Soda
  (4, 5.75,  '2025-05-06 13:45:00', '2025-05-06 13:15:00'), -- 1x Salad
  (5, 10.25, '2025-05-06 14:30:00', '2025-05-06 14:00:00'); -- 1x Pasta

INSERT INTO order_item (order_id, menu_item_id, quantity, description)
VALUES
  (1, 1, 2, 'Two salads'),         -- 2 × 5.75 = 11.50
  (1, 2, 1, 'One pasta'),          -- 10.25 → Total: 21.75

  (2, 3, 1, 'One garlic bread'),   -- 3.50

  (3, 4, 2, 'Two sodas'),          -- 2 × 1.99 = 3.98

  (4, 1, 1, 'One salad'),          -- 5.75

  (5, 2, 1, 'One pasta');          -- 10.25
