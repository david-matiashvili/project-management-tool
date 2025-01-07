import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
interface TextAreaProps {
    label: string;
    name: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    disabled?: boolean;
}
export declare const TextArea: React.FC<TextAreaProps>;
export {};
