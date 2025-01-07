import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (userEmail: string) => {
    if (socket) {
        socket.disconnect();
    }

    socket = io('http://localhost:3000', { transports: ['websocket'] });

    socket.on('connect', () => {
        console.log('Socket connected:', socket?.id);
        if (userEmail) {
            socket?.emit('join', userEmail);
        }
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });

    return socket;
};

export const getSocket = () => socket;
