import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// app.get('/api/products/:id', (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);
//   res.json(product);
// });
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
