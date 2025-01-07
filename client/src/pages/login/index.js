import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from "@components/common/Input";
// import {Button} from "@components/Button";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth";
export const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { login } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (state?.isRegistered && state?.message) {
            toast.success(state.message);
            navigate('.', { replace: true, state: {} });
        }
    }, [state, navigate]);
    const onSubmit = async (data) => {
        await login(data.email, data.password);
    };
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100", children: _jsxs("div", { className: "w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-bold text-center text-gray-900", children: "Login" }), _jsxs("form", { className: "space-y-4", onSubmit: handleSubmit(onSubmit), children: [_jsx(Input, { label: "Email Address", type: "text", name: "email", placeholder: "you@example.com", register: register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                },
                            }), error: errors.email }), _jsx(Input, { label: "Password", type: "password", name: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", register: register('password', { required: 'Password is required' }), error: errors.password }), _jsx("button", { type: "submit", className: "w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", children: "Sign In" })] }), _jsxs("p", { className: "text-sm text-center text-gray-600", children: ["Don\u2019t have an account?", ' ', _jsx(Link, { to: "/register", className: "text-blue-600", children: "Register" })] })] }) }));
};
