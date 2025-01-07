import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
interface SelectProps {
    label?: string;
    name: string;
    value?: string | number;
    options: {
        value: string | number;
        label: string;
    }[];
    register?: UseFormRegisterReturn;
    error?: FieldError;
    disabled?: boolean;
    onChange?: (value: string | number) => void;
}
export declare const Select: React.FC<SelectProps>;
export {};
