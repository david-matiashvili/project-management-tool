import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// import { useState } from 'react'
import { RouterProvider } from "react-router-dom";
// Alter messages config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authenticatedRoutes } from "./routes/authenticated";
import { unauthenticatedRoutes } from "./routes/unathenticated";
import { createBrowserRouter } from "react-router-dom";
function App() {
    const router = createBrowserRouter([authenticatedRoutes, unauthenticatedRoutes]);
    return (_jsxs(_Fragment, { children: [_jsx(RouterProvider, { router: router }), _jsx(ToastContainer, { position: "bottom-right", autoClose: 5000, hideProgressBar: true, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, pauseOnHover: true })] }));
}
export default App;
