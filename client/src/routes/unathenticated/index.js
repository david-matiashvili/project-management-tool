import { jsx as _jsx } from "react/jsx-runtime";
import { Login } from "@pages/login";
import { NotFoundPage } from "@pages/not_found";
import { Register } from "@pages/register";
import { WrapperRequireUnauth } from "../wrapper";
export const unauthenticatedRoutes = {
    element: _jsx(WrapperRequireUnauth, {}),
    children: [
        { path: "/login", element: _jsx(Login, {}) },
        { path: "/register", element: _jsx(Register, {}) },
        { path: "/*", element: _jsx(NotFoundPage, {}) }
    ],
};
