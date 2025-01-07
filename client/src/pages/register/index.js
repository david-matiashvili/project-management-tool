import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import { Input } from "@components/common/Input";
import { registerUser } from "@api/user/index";
export const Register = () => {
    const { register, getValues, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data.name, data.email, data.password);
            navigate('/login', { state: { isRegistered: true, message: response.message } });
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error;
                console.error('Registration failed:', errorMessage);
                toast.error(errorMessage);
            }
            else {
                console.error('An unexpected error occurred:', error);
                toast.error('An unexpected error occurred.');
            }
        }
    };
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100", children: _jsxs("div", { className: "w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-bold text-center text-gray-900", children: "Register" }), _jsxs("form", { className: "space-y-4", onSubmit: handleSubmit(onSubmit), children: [_jsx(Input, { label: "Full Name", type: "text", name: "name", placeholder: "Melsik Vardanyan", register: register('name', { required: 'Name is required' }), error: errors.name }), _jsx(Input, { label: "Email Address", type: "email", name: "email", placeholder: "you@example.com", register: register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                },
                            }), error: errors.email }), _jsx(Input, { label: "Password", type: "password", name: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", register: register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            }), error: errors.password }), _jsx(Input, { label: "Confirm Password", type: "password", name: "confirmPassword", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", register: register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: (value) => value === getValues('password') || 'Passwords do not match',
                            }), error: errors.confirmPassword }), _jsx("button", { type: "submit", className: "w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", children: "Register" })] }), _jsxs("p", { className: "text-sm text-center text-gray-600", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "text-blue-600", children: "Sign In" })] })] }) }));
};
