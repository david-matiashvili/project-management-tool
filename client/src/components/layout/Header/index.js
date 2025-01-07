import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "@/context/auth";
import { Button } from "@components/common/Button";
import { ProjectRequests } from "@components/dashboard/ProjectRequests";
export const Header = () => {
    const { logout } = useAuth();
    return (_jsxs("header", { className: "flex justify-between items-center p-4 bg-gray-800 text-white", children: [_jsx("h1", { className: "text-xl font-bold", children: "Project Management Tool" }), _jsxs("div", { className: "flex justify-end gap-10 ", children: [_jsx(ProjectRequests, {}), _jsx(Button, { onClick: logout, label: "Logout", className: "bg-red-500 hover:bg-red-600" })] })] }));
};
