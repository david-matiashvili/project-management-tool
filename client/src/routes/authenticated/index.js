import { jsx as _jsx } from "react/jsx-runtime";
import { WrapperRequireAuth } from "../wrapper";
import { Dashboard } from "@pages/dashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export const authenticatedRoutes = {
    element: _jsx(WrapperRequireAuth, {}),
    children: [
        { path: "/", element: _jsx(DndProvider, { backend: HTML5Backend, children: _jsx(Dashboard, {}) }) },
    ],
};
