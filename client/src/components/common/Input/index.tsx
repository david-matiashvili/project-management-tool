import React from 'react';
import {FieldError, UseFormRegisterReturn} from 'react-hook-form';

interface InputProps {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({label, type, name, placeholder, register, disabled, error}) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register}
                className={`block w-full ${type == "color" ? "h-10" : ""} px-3 py-2 mt-1 text-gray-900 bg-gray-50 border ${
                    error ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                disabled={disabled}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
};
