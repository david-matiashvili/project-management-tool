import {FC, useEffect, useState} from "react";
import {EmailIcon} from "@/assets/icons/EmailIcon";
import {useAuth} from "@/context/auth";
import {ProjectRequest} from "@/types/dashboard"

import {getUserProjectRequests, acceptProjectRequest, declineProjectRequest} from "@api/projectRequest"
import {toast} from "react-toastify";

export const ProjectRequests: FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {socket, user} = useAuth();

    // Sample data for requests
    const [requests, setRequests] = useState<ProjectRequest[]>([]);

    useEffect(() => {
        const handleGetUserProjectRequests: (email?: string) => Promise<void> = async (email) => {
            try {
                if (!email) return;
                const {data} = await getUserProjectRequests(email);
                setRequests(data);
            } catch (error) {
                toast.error("Failed to get project requests");
            }
        }

        handleGetUserProjectRequests(user?.email);
    }, []);

    useEffect(() => {
        if (!socket) return;

        // Listen for new project requests
        socket.on('newProjectRequest', (request: ProjectRequest) => {
            setRequests((prevRequests) => [...prevRequests, request]); // Update state dynamically
        });

        // Cleanup on component unmount
        return () => {
            socket.off('newProjectRequest');
        };
    }, [socket]);


    // Handlers for accept and decline
    const handleAccept: (id: number) => Promise<void> = async (id) => {
        try {
            const {success, message} = await acceptProjectRequest(id);
            setRequests((prevRequests) => prevRequests.filter((req) => req.projectId !== id));
        } catch (error) {
            toast.error("Failed to accept request");
        }

    };

    const handleDecline: (id: number) => Promise<void> = async (id) => {
        try {
            const {success, message} = await declineProjectRequest(id);
            setRequests((prevRequests) => prevRequests.filter((req) => req.projectId !== id));
        } catch (error) {
            toast.error("Failed to accept request");
        }
    };

    return (
        <div className="relative">
            {/* Mail Icon with Badge */}
            <button
                className="relative p-2 bg-gray-700 rounded-full hover:bg-gray-600"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <EmailIcon/>
                {requests.length > 0 && (
                    <span
                        className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {requests.length}
            </span>
                )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-10">
                    <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-800">Project Requests</h3>
                        {requests.length === 0 ? (
                            <p className="mt-2 text-sm text-gray-500">No requests available.</p>
                        ) : (
                            <ul className="mt-2 space-y-2">
                                {requests.map((request) => (
                                    <li
                                        key={request.id}
                                        className="flex flex-col p-3 bg-gray-100 rounded-md shadow-sm"
                                    >
                                        <div className="text-sm text-gray-800 font-medium">
                                            New Request
                                            <div>Project: {request.projectName}</div>
                                            <div>Admin: {request.sender}</div>
                                            <div>Role as: {request.roleName}</div>
                                        </div>
                                        <div className="flex justify-end mt-2 space-x-2">
                                            <button
                                                onClick={() => handleAccept(request.projectId)}
                                                className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleDecline(request.projectId)}
                                                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}