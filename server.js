import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ideasRoutes from './routes/ideas.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', ideasRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
