import React from 'react';
import {FieldError, UseFormRegisterReturn} from 'react-hook-form';

interface SelectProps {
    label?: string;
    name: string;
    value?: string | number;
    options: { value: string | number; label: string }[];
    register?: UseFormRegisterReturn;
    error?: FieldError;
    disabled?: boolean;
    onChange?: (value: string | number) => void;
}

export const Select: React.FC<SelectProps> = ({label, name, value, options, register, disabled, error, onChange}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <select
                id={name}
                {...register}
                value={value}
                className={`block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border ${
                    error ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                disabled={disabled}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
};
