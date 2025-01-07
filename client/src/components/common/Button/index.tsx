import {FC, ReactNode} from "react";

interface ButtonProps {
    onClick?: () => void;
    label?: string;
    type?: "submit" | "reset" | "button" | undefined;
    className?: string;
    disabled?: boolean;
}

interface ButtonV2Props {
    onClick?: () => void;
    type?: "submit" | "reset" | "button" | undefined;
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({onClick, label, type, disabled, className}) => (
    <button
        onClick={onClick}
        type={type}
        className={`px-4 py-2 rounded ${className}`}
        disabled={disabled}
    >
        {label}
    </button>
);

export const ButtonV2: FC<ButtonV2Props> = ({onClick, type, disabled, className, children}) => (
    <button
        onClick={onClick}
        type={type}
        className={`px-4 py-2 rounded ${className}`}
        disabled={disabled}
    >
        {children}
    </button>
);