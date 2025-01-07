import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import authRouter from './routes/auth_routes.js';
import authenticateToken from './middlewares/authenticate_token.js';
import {Server as SocketIOServer} from 'socket.io';

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3030',  // Frontend URL from .env or default
    credentials: true,  // Allow cookies or credentials
}));

// Built-in Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Authenticated Routes
app.use('/api', authenticateToken, authRouter);

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*', // Configure for production
    },
});

// WebSocket Handlers
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', (userEmail) => {
        if (userEmail) {
            socket.join(userEmail); // Join room identified by email
            console.log(`User ${userEmail} joined room ${userEmail}`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Attach `io` to the app for use in controllers
app.set('io', io);

// Start Server
server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
