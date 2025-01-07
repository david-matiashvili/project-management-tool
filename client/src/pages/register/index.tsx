import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from "axios";
import {Input} from "@components/common/Input";
import {registerUser} from "@api/user/index";

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register: React.FC = () => {
    const {
        register,
        getValues,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterFormValues>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        try {
            const response = await registerUser(data.name, data.email, data.password);
            navigate('/login', {state: {isRegistered: true, message: response.message}});
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage: string = error.response.data.error;
                console.error('Registration failed:', errorMessage);
                toast.error(errorMessage);
            } else {
                console.error('An unexpected error occurred:', error);
                toast.error('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        placeholder="Melsik Vardanyan"
                        register={register('name', {required: 'Name is required'})}
                        error={errors.name}
                    />
                    <Input
                        label="Email Address"
                        type="email"
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
                        register={register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        error={errors.password}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        register={register('confirmPassword', {
                            required: 'Confirm Password is required',
                            validate: (value) =>
                                value === getValues('password') || 'Passwords do not match',
                        })}
                        error={errors.confirmPassword}
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-blue-600"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};
