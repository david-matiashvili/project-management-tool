import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Select = ({ label, name, value, options, register, disabled, error, onChange }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };
    return (_jsxs("div", { children: [_jsx("label", { htmlFor: name, className: "block text-sm font-medium text-gray-700", children: label }), _jsx("select", { id: name, ...register, value: value, className: `block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`, disabled: disabled, onChange: handleChange, children: options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) }), error && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: error.message }))] }));
};
