// Import required modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

// Initialize express application
const app = express();
const PORT = 3000;

// Register middleware modules
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1201310142',
    database: 'ecommerce'
});

// Establish database connection
db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err);
        return;
    }
    console.log('✅ MySQL connected successfully');
});

// Retrieve all product data from database
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Modify product price by specified product id
app.put('/api/products/:id/price', (req, res) => {
    const { id } = req.params;
    const { newPrice } = req.body;
    db.query(
        'UPDATE products SET price = ? WHERE id = ?',
        [newPrice, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: result.affectedRows });
        }
    );
});

// Temporary storage for shopping cart data
let cart = [];

// Get current cart item list
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Add selected product into shopping cart
app.post('/api/cart/add', (req, res) => {
    const { productId, quantity } = req.body;
    db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
        if (err || !results.length) return res.status(404).json({ error: 'Product not found' });
        const product = results[0];
        const existing = cart.find(item => item.id === productId);
        if (existing) existing.quantity += quantity;
        else cart.push({ ...product, quantity });
        res.json(cart);
    });
});

// Delete specified item from shopping cart
app.delete('/api/cart/remove/:id', (req, res) => {
    const id = parseInt(req.params.id);
    cart = cart.filter(item => item.id !== id);
    res.json(cart);
});

// Launch local server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});