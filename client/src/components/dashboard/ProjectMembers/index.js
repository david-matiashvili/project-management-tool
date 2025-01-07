import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@components/common/Button";
import { Select } from "@components/common/Select";
import { AddMemberModal } from "@components/dashboard/ProjectMembers/AddMemberModal";
import { searchUsersByEmail } from "@/api/user";
import { createProjectRequest } from "@/api/projectRequest";
import { toast } from "react-toastify";
import { isRoleAccepted, ProtectedComponent } from "@/context/role";
import { ADMIN_ROLE } from "@/constants/roles_constants";
import { changeProjectMemberRole, deleteProjectMember } from "@api/project/index";
import { useAuth } from "@/context/auth";
export const ProjectMembers = ({ members, roles, selectedProject, setIsMembersShow, setReloadProjectMembers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const mockSearch = async (query) => {
        try {
            const { data } = await searchUsersByEmail(selectedProject.id, query);
            return data;
        }
        catch (error) {
            toast.error("Failed to search users");
            return [];
        }
    };
    const handleCreateProjectRequest = async (formData) => {
        try {
            const result = await createProjectRequest(formData, selectedProject.id);
            if (!result.success) {
                // Display the error message from the server
                toast.error(result.message || "Failed to create project request");
                return;
            }
            toast.success(`${result.data.user_email} Request sent successfully!`);
        }
        catch (error) {
            // Handle unexpected errors
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred while creating the project request.");
        }
    };
    const handleDeleteProjectMember = async (userId) => {
        try {
            const result = await deleteProjectMember(selectedProject.id, userId);
            if (!result.success) {
                // Display the error message from the server
                toast.error(result.message || "Failed to delete project member");
                return;
            }
            toast.success("Project member deleted successfully!");
            setReloadProjectMembers((prev) => !prev);
        }
        catch (error) {
            // Handle unexpected errors
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred while deleting the project member.");
        }
    };
    const handleChangeProjectMemberRole = async (userId, roleId) => {
        try {
            const result = await changeProjectMemberRole(selectedProject.id, userId, roleId);
            if (!result.success) {
                // Display the error message from the server
                toast.error(result.message || "Failed to change project member role");
                return;
            }
            toast.success("Project member role changed successfully!");
            setReloadProjectMembers((prev) => !prev);
        }
        catch (error) {
            // Handle unexpected errors
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred while changing the project member role.");
        }
    };
    return (_jsxs("div", { className: "p-6 w-3/4", children: [_jsx("div", { className: "flex justify-start", children: _jsx(Button, { className: "btn-primary", label: "<- Back", onClick: () => {
                        setIsMembersShow(false);
                    } }) }), _jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-bold", children: "Project Members" }), _jsx(ProtectedComponent, { requiredRole: ADMIN_ROLE, children: _jsx(Button, { className: "btn-primary", onClick: () => setIsModalOpen(true), label: "Add New Member" }) })] }), _jsxs("table", { className: "table-auto w-full border border-gray-200 rounded-lg", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 text-left", children: "Name" }), _jsx("th", { className: "px-4 py-2 text-left", children: "Role" }), _jsx(ProtectedComponent, { requiredRole: ADMIN_ROLE, children: _jsx("th", { className: "px-4 py-2 text-left", children: "Actions" }) })] }) }), _jsx("tbody", { children: members.map((member) => (_jsxs("tr", { className: "border-t border-gray-200", children: [_jsxs("td", { className: "px-4 py-2", children: [member.name, " ", _jsx("span", { children: user?.userId == member.id && "(It`s You)" })] }), _jsx("td", { className: "px-4 py-2", children: isRoleAccepted(ADMIN_ROLE) ?
                                        (_jsx(Select, { name: `role-${member.id}`, options: roles.map((role) => ({
                                                value: role.id,
                                                label: role.name,
                                            })), value: roles.find((role) => (role.id === member.role))?.id || undefined, 
                                            // onChange={(selectedOption) => onChangeRole(member.id, selectedOption?.value)}
                                            onChange: (roleId) => handleChangeProjectMemberRole(member.id, Number(roleId)) }))
                                        : roles.find((role) => (role.id === member.role))?.name }), _jsx(ProtectedComponent, { requiredRole: ADMIN_ROLE, children: _jsx("td", { className: "px-4 py-2", children: user?.userId != member.id && (_jsx(Button, { className: "btn-danger mr-2", onClick: () => handleDeleteProjectMember(member.id), label: "Delete" })) }) })] }, member.id))) })] }), _jsx(AddMemberModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), roles: roles, onSubmit: handleCreateProjectRequest, onSearch: mockSearch })] }));
};
