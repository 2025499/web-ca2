-- Create a new e-commerce database
CREATE DATABASE ecommerce;
USE ecommerce;

-- Create product table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    description TEXT
);

-- Insert 9 products (matches my website perfectly)
INSERT INTO products (name, price, image, description) VALUES
('Elegant White Wrap Dress', 39.99, 'images/dress1.jpg', 'Minimalist wrap design, perfect for casual outings'),
('Vintage Blue Linen Dress', 49.99, 'images/dress2.jpg', 'Soft linen blend with belted waist, summer essential'),
('Off-Shoulder Satin Gown', 59.99, 'images/dress3.jpg', 'Elegant satin fabric, ideal for parties and events'),
('Sparkle Glitter Wedding Heels', 49.99, 'images/shoes1.jpg', 'Shimmering finish, perfect for special occasions'),
('Crystal-Strap Pointed Heels', 54.99, 'images/shoes2.jpg', 'Delicate crystal straps, elegant evening pumps'),
('Pearl-Embellished Lace Heels', 59.99, 'images/shoes3.jpg', 'Lace texture with pearl chain strap, romantic style'),
('Beige Linen Wide-Leg Trousers', 29.99, 'images/pants1.jpg', 'Breathable linen blend, casual yet chic'),
('Taupe Pleated Linen Trousers', 39.99, 'images/pants2.jpg', 'High-waisted pleated design, office-ready style'),
('White Straight-Leg Denim Jeans', 49.99, 'images/pants3.jpg', 'Classic high-waisted fit, versatile wardrobe staple');

SELECT * FROM products;