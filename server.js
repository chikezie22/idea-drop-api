import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ideasRoutes from './routes/ideas.js';
import { errorHandler } from './middleware/error-handler.js';
import connectDB from './config/db.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
// connect to mongodb 
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// route
app.use('/api', ideasRoutes);
// 404 fallback for routes not defined in our code
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});
// error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
