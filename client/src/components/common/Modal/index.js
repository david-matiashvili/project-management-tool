import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@components/common/Button"; // Import the Button component
const modalSizes = {
    small: "w-1/4",
    medium: "w-1/3",
    large: "w-1/2",
};
export const Modal = ({ isOpen, onClose, size = "medium", title, children }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center", children: _jsxs("div", { className: `bg-white p-6 rounded-lg shadow-lg ${modalSizes[size]} relative`, children: [_jsx(Button, { type: "button", onClick: onClose, className: "p-0 py-3 absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl", label: "\u274C" }), _jsx("h2", { className: "text-xl font-bold mb-4", children: title }), _jsx("div", { children: children })] }) }));
};
