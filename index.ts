import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from "./router/userRouter"
import propertyRouter from "./router/propertyRoute"
import path from 'path';
import multer from 'multer';

dotenv.config();
connectDB();

const app = express();

// Configure middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));



// Define routes
app.use(userRouter)
app.use(propertyRouter)

// Start the server
app.listen(process.env.PORT, () => {
  console.log('SUCCESSFULLY CONNECTED');
});
