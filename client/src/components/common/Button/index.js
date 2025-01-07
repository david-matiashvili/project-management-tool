import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ onClick, label, type, disabled, className }) => (_jsx("button", { onClick: onClick, type: type, className: `px-4 py-2 rounded ${className}`, disabled: disabled, children: label }));
export const ButtonV2 = ({ onClick, type, disabled, className, children }) => (_jsx("button", { onClick: onClick, type: type, className: `px-4 py-2 rounded ${className}`, disabled: disabled, children: children }));
