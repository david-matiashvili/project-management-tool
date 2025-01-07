import {Login} from "@pages/login";
import {NotFoundPage} from "@pages/not_found";
import {Register} from "@pages/register";
import {WrapperRequireUnauth} from "../wrapper";


export const unauthenticatedRoutes =
    {
        element: <WrapperRequireUnauth/>,
        children: [
            {path: "/login", element: <Login/>},
            {path: "/register", element: <Register/>},
            {path: "/*", element: <NotFoundPage/>}
        ],
    }