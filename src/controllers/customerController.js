const pool = require('../db');

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM customers');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a customer by ID
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM customers WHERE customer_id=$1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new customer
const addCustomer = async (req, res) => {
    try {
        const { full_name, phone, email } = req.body; // use full_name here
        const result = await pool.query(
            'INSERT INTO customers (full_name, phone, email) VALUES ($1,$2,$3) RETURNING *',
            [full_name, phone, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a customer
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, phone, email } = req.body;
        const result = await pool.query(
            'UPDATE customers SET full_name=$1, phone=$2, email=$3 WHERE customer_id=$4 RETURNING *',
            [full_name, phone, email, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM customers WHERE customer_id=$1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
