// import { useState } from 'react'
import {RouterProvider} from "react-router-dom";

// Alter messages config
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {authenticatedRoutes} from "./routes/authenticated";
import {unauthenticatedRoutes} from "./routes/unathenticated";
import {createBrowserRouter} from "react-router-dom";


function App() {

    const router = createBrowserRouter([authenticatedRoutes, unauthenticatedRoutes])

    return (
        <>
            <RouterProvider router={router}/>
            <ToastContainer
                position="bottom-right"
                autoClose={5000} // 5 seconds
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
        </>
    )
}

export default App
