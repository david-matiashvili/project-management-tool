import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { axiosUnauthInstance } from "@api/instances/unauth-instance";
import { initializeSocket } from "@/services/socketService";
const AuthContext = createContext(null);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']); // Hook from react-cookie
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            // console.log({a: cookies.accessToken, r: cookies.refreshToken});
            if (cookies.accessToken == "undefined" && cookies.refreshToken == "undefined") {
                return;
            }
            const accessToken = cookies.accessToken;
            if (accessToken) {
                await validateToken(accessToken);
            }
            else if (cookies.refreshToken) {
                await refreshToken();
            }
        };
        checkAuth();
    }, [cookies.accessToken, cookies.refreshToken]);
    const validateToken = async (token) => {
        try {
            const response = await axiosUnauthInstance.post('/auth/validate', {
                accessToken: cookies.accessToken,
            });
            setUser(response.data.data.user);
            setSocket(initializeSocket(response.data.data.user.email));
        }
        catch {
            await refreshToken();
        }
    };
    // Refresh Token Function
    const refreshToken = async () => {
        try {
            const response = await axiosUnauthInstance.post('/auth/refresh', {
                refreshToken: cookies.refreshToken,
            });
            const { accessToken, user } = response.data.data;
            setCookie('accessToken', accessToken, { path: '/', maxAge: 15 * 60 }); // 15 minutes
            setUser(user);
            setSocket(initializeSocket(user.email));
        }
        catch (error) {
            console.error('Refresh failed:', error);
            await logout();
        }
    };
    const login = async (email, password) => {
        try {
            const response = await axiosUnauthInstance.post('/auth/login', { email, password });
            const { accessToken, refreshToken, user } = response.data.data;
            setCookie('accessToken', accessToken, { path: '/', maxAge: 7 * 24 * 60 * 60 }); // Set cookie for 7 days
            setCookie('refreshToken', refreshToken, { path: '/', maxAge: 30 * 24 * 60 * 60 }); // Set cookie for 30 days
            setUser(user);
            setSocket(initializeSocket(user.email));
        }
        catch (error) {
            console.error('Login failed', error);
            throw new Error('Invalid credentials');
        }
    };
    const logout = async () => {
        try {
            await axiosUnauthInstance.post('/auth/logout', { refreshToken: cookies.refreshToken });
            setUser(null);
            removeCookie('accessToken', { path: '/' });
            removeCookie('refreshToken', { path: '/' }); // Remove token from cookies
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            ;
        }
        catch (error) {
            console.error('Logout failed', error);
            throw new Error('Logout failed');
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            login,
            logout,
            isAuthenticated: !!user,
            socket
        }, children: children }));
};
