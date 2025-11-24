const pool = require('../db');

// Get all orders
const getOrders = async (req, res) => {
    try {
        const ordersResult = await pool.query('SELECT * FROM orders ORDER BY order_id');
        const orders = [];

        for (const order of ordersResult.rows) {
            const itemsResult = await pool.query(
                'SELECT * FROM order_items WHERE order_id=$1',
                [order.order_id]
            );
            orders.push({ ...order, items: itemsResult.rows });
        }
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Place new order
const createOrder = async (req, res) => {
    try {
        const { customer_id, employee_id, items } = req.body;

        const orderResult = await pool.query(
            'INSERT INTO orders (customer_id, employee_id) VALUES ($1, $2) RETURNING *',
            [customer_id, employee_id]
        );

        const order_id = orderResult.rows[0].order_id;

        for (const item of items) {
            const productResult = await pool.query('SELECT price FROM products WHERE product_id=$1', [item.product_id]);
            const price = productResult.rows[0].price;

            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [order_id, item.product_id, item.quantity, price]
            );
        }

        res.status(201).json({ message: 'Order created', order_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM order_items WHERE order_id=$1', [id]);
        await pool.query('DELETE FROM orders WHERE order_id=$1', [id]);
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getOrders, createOrder, deleteOrder };
