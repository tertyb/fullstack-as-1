import express, { Request, Response } from 'express';
import cors from 'cors'
import { config } from './config/config';
import dotenv from 'dotenv'
import connectDB from './config/db';
import { postRouter } from './controllers/post.controller';

const app = express();
const PORT = config.PORT;

app.use(express.json());

dotenv.config();

// Middleware
app.use(cors());

app.use('/api/post', postRouter);

connectDB()



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
