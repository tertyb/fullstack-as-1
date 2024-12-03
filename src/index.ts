import express, { Request, Response } from 'express';
import cors from 'cors'
import { config } from './config/config';
import dotenv from 'dotenv'
import connectDB from './config/db';
import { postRouter } from './controllers/post.controller';
import { commentRouter } from './controllers/comment.controller';

const app = express();
const PORT = config.PORT;

app.use(express.json());

dotenv.config();

// Middleware
app.use(cors());

app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

connectDB()



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
