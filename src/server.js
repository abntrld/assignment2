// Import packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/customers', customerRoutes);
app.use('/employees', employeeRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use(express.static('public')); // Serve files from public folder


// Root endpoint
app.get('/', (req, res) => {
    res.send('🛒 E-Commerce Web Service is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
