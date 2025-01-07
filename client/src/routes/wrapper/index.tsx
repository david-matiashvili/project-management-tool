import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export const WrapperRequireAuth: React.FC = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const WrapperRequireUnauth: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};