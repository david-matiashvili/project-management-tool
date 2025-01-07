import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { EmailIcon } from "@/assets/icons/EmailIcon";
import { useAuth } from "@/context/auth";
import { getUserProjectRequests, acceptProjectRequest, declineProjectRequest } from "@api/projectRequest";
import { toast } from "react-toastify";
export const ProjectRequests = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { socket, user } = useAuth();
    // Sample data for requests
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        const handleGetUserProjectRequests = async (email) => {
            try {
                if (!email)
                    return;
                const { data } = await getUserProjectRequests(email);
                setRequests(data);
            }
            catch (error) {
                toast.error("Failed to get project requests");
            }
        };
        handleGetUserProjectRequests(user?.email);
    }, []);
    useEffect(() => {
        if (!socket)
            return;
        // Listen for new project requests
        socket.on('newProjectRequest', (request) => {
            setRequests((prevRequests) => [...prevRequests, request]); // Update state dynamically
        });
        // Cleanup on component unmount
        return () => {
            socket.off('newProjectRequest');
        };
    }, [socket]);
    // Handlers for accept and decline
    const handleAccept = async (id) => {
        try {
            const { success, message } = await acceptProjectRequest(id);
            setRequests((prevRequests) => prevRequests.filter((req) => req.projectId !== id));
        }
        catch (error) {
            toast.error("Failed to accept request");
        }
    };
    const handleDecline = async (id) => {
        try {
            const { success, message } = await declineProjectRequest(id);
            setRequests((prevRequests) => prevRequests.filter((req) => req.projectId !== id));
        }
        catch (error) {
            toast.error("Failed to accept request");
        }
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { className: "relative p-2 bg-gray-700 rounded-full hover:bg-gray-600", onClick: () => setIsDropdownOpen(!isDropdownOpen), children: [_jsx(EmailIcon, {}), requests.length > 0 && (_jsx("span", { className: "absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white", children: requests.length }))] }), isDropdownOpen && (_jsx("div", { className: "absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-10", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "text-sm font-semibold text-gray-800", children: "Project Requests" }), requests.length === 0 ? (_jsx("p", { className: "mt-2 text-sm text-gray-500", children: "No requests available." })) : (_jsx("ul", { className: "mt-2 space-y-2", children: requests.map((request) => (_jsxs("li", { className: "flex flex-col p-3 bg-gray-100 rounded-md shadow-sm", children: [_jsxs("div", { className: "text-sm text-gray-800 font-medium", children: ["New Request", _jsxs("div", { children: ["Project: ", request.projectName] }), _jsxs("div", { children: ["Admin: ", request.sender] }), _jsxs("div", { children: ["Role as: ", request.roleName] })] }), _jsxs("div", { className: "flex justify-end mt-2 space-x-2", children: [_jsx("button", { onClick: () => handleAccept(request.projectId), className: "px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600", children: "Accept" }), _jsx("button", { onClick: () => handleDecline(request.projectId), className: "px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600", children: "Decline" })] })] }, request.id))) }))] }) }))] }));
};
