import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Input = ({ label, type, name, placeholder, register, disabled, error }) => {
    return (_jsxs("div", { children: [_jsx("label", { htmlFor: name, className: "block text-sm font-medium text-gray-700", children: label }), _jsx("input", { id: name, type: type, placeholder: placeholder, ...register, className: `block w-full ${type == "color" ? "h-10" : ""} px-3 py-2 mt-1 text-gray-900 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`, disabled: disabled }), error && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: error.message }))] }));
};
