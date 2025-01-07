import React, { FC } from "react";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    size?: "small" | "medium" | "large";
    title: string;
    children: React.ReactNode;
}
export declare const Modal: FC<ModalProps>;
export {};
