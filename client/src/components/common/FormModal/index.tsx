import React, {FC} from "react";
import {Button} from "@components/common/Button";  // Import the Button component

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    size?: "small" | "medium" | "large"; // Size options for the modal
    title: string;
    children: React.ReactNode;
}

const modalSizes = {
    small: "w-1/4",
    medium: "w-1/3",
    large: "w-1/2",
};

export const FormModal: FC<FormModalProps> = ({isOpen, onClose, onSubmit, size = "medium", title, children}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className={`bg-white p-6 rounded-lg shadow-lg ${modalSizes[size]} relative`}>
                <Button
                    type="button"
                    onClick={onClose}
                    className="p-0 py-3 absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
                    label="❌"
                />

                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <form onSubmit={onSubmit}>
                    {children}
                    <div className="flex justify-between mt-4">
                        <Button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                            label="Cancel"
                        />
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            label="Submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
