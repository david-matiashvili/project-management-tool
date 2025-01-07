import React from 'react';
interface User {
    username: string;
    email: string;
    userId: number;
}
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    socket: any;
}
export declare const useAuth: () => AuthContextType;
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
