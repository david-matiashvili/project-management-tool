import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth';
export const WrapperRequireAuth = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login" });
};
export const WrapperRequireUnauth = () => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/" });
};
