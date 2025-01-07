import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
export const NotFoundPage = () => {
    return (_jsx("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-100", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-6xl font-bold text-gray-800", children: "404" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Oops! The page you're looking for doesn't exist." }), _jsx("div", { className: "mt-10", children: _jsx(Link, { to: "/", className: "mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300", children: "Go Back Home" }) })] }) }));
};
