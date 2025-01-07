import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import unauthRouter from './routes/unauth_routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.AUTH_PORT || 3001;

// CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3030',  // Allow frontend URL from .env
    credentials: true,  // Allow cookies or other credentials
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', unauthRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
