const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/products');
const requestLogger = require('./middleware/logger');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Essential Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/products', productRoutes);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`${process.env.SERVICE_NAME} running on http://localhost:${port}`);
});