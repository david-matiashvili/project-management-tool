import React, { FC } from "react";
interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    size?: "small" | "medium" | "large";
    title: string;
    children: React.ReactNode;
}
export declare const FormModal: FC<FormModalProps>;
export {};
