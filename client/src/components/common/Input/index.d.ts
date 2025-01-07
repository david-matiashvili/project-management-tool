import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
interface InputProps {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    disabled?: boolean;
}
export declare const Input: React.FC<InputProps>;
export {};
