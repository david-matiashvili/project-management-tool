import React, {useEffect, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Input} from "@components/common/Input";
// import {Button} from "@components/Button";
import {toast} from "react-toastify";
import {useAuth} from "@/context/auth";

interface LoginFormValues {
    email: string;
    password: string;
}

export const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormValues>();

    const {login} = useAuth();
    const {state} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (state?.isRegistered && state?.message) {
            toast.success(state.message);
            navigate('.', {replace: true, state: {}});
        }
    }, [state, navigate]);


    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        await login(data.email, data.password);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email Address"
                        type="text"
                        name="email"
                        placeholder="you@example.com"
                        register={register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address',
                            },
                        })}
                        error={errors.email}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        register={register('password', {required: 'Password is required'})}
                        error={errors.password}
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Don’t have an account?{' '}
                    <Link
                        to="/register"
                        className="text-blue-600"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};
