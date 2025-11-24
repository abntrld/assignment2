
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const customerRoutes = require('./routes/customerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


const app = express();


app.use(cors());
app.use(bodyParser.json());


app.use('/customers', customerRoutes);
app.use('/employees', employeeRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use(express.static('public')); 



app.get('/', (req, res) => {
    res.send('🛒 E-Commerce Web Service is running');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
