import { FC, ReactNode } from "react";
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
export declare const Button: FC<ButtonProps>;
export declare const ButtonV2: FC<ButtonV2Props>;
export {};
