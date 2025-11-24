const pool = require('../db'); // PostgreSQL pool

// Get all products
const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY product_id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add new product
const addProduct = async (req, res) => {
    try {
        const { product_name, category, price, stock } = req.body;
        const result = await pool.query(
            'INSERT INTO products (product_name, category, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [product_name, category, price, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE product_id=$1', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getProducts, addProduct, deleteProduct };
