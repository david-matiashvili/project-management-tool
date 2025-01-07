import React, {FC, useState} from "react";
import {Button} from "@components/common/Button";
import {Select} from "@components/common/Select";
import {AddMemberModal} from "@components/dashboard/ProjectMembers/AddMemberModal";
import {searchUsersByEmail} from "@/api/user";
import {createProjectRequest} from "@/api/projectRequest";
import {toast} from "react-toastify";

import {isRoleAccepted, ProtectedComponent} from "@/context/role"
import {ADMIN_ROLE} from "@/constants/roles_constants";

// Types
import {Project, ProjectMember, Role, AddMemberFormData} from "@/types/dashboard";
import {changeProjectMemberRole, deleteProjectMember} from "@api/project/index";
import {useAuth} from "@/context/auth";

interface MembersTableProps {
    members: ProjectMember[];
    roles: Role[];
    selectedProject: Project;
    setIsMembersShow: (isMembersShow: boolean) => void;
    setReloadProjectMembers: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectMembers: FC<MembersTableProps> = ({
                                                          members,
                                                          roles,
                                                          selectedProject,
                                                          setIsMembersShow,
                                                          setReloadProjectMembers
                                                      }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {user} = useAuth();

    const mockSearch = async (query: string): Promise<string[]> => {
        try {
            const {data} = await searchUsersByEmail(selectedProject.id, query);
            return data;
        } catch (error) {
            toast.error("Failed to search users");
            return [];
        }
    };


    const handleCreateProjectRequest = async (formData: AddMemberFormData) => {
        try {
            const result = await createProjectRequest(formData, selectedProject.id);

            if (!result.success) {
                // Display the error message from the server
                toast.error(result.message || "Failed to create project request");
                return;
            }

            toast.success(`${result.data.user_email} Request sent successfully!`);
        } catch (error: any) {
            // Handle unexpected errors
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred while creating the project request.");
        }
    };

    const handleDeleteProjectMember: (userId: number) => Promise<any> = async (userId) => {
        try {
            const result = await deleteProjectMember(selectedProject.id, userId);

            if (!result.success) {
                // Display the error message from the server
                toast.error(result.message || "Failed to delete project member");
                return;
            }

            toast.success("Project member deleted successfully!");
            setReloadProjectMembers((prev: boolean) => !prev);
        } catch (error: any) {
            // Handle unexpected errors
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred while deleting the project member.");
        }
    };

    const handleChangeProjectMemberRole: (userId: number, roleId: number) => Promise<any> = async (userId, roleId) => {
        try {
            const result = await changeProjectMemberRole(selectedProject.id, userId, roleId);

            if (!result.success) {
                // Display the error message from the server
                toast.error(result.message || "Failed to change project member role");
                return;
            }

            toast.success("Project member role changed successfully!");
            setReloadProjectMembers((prev: boolean) => !prev);
        } catch (error: any) {
            // Handle unexpected errors
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred while changing the project member role.");
        }
    };


    return (
        <div className="p-6 w-3/4">
            <div className="flex justify-start">
                <Button className="btn-primary" label="<- Back" onClick={() => {
                    setIsMembersShow(false)
                }}/>
            </div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Project Members</h2>

                <ProtectedComponent requiredRole={ADMIN_ROLE}>
                    <Button
                        className="btn-primary"
                        onClick={() => setIsModalOpen(true)}
                        label="Add New Member"
                    />
                </ProtectedComponent>
            </div>
            <table className="table-auto w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <ProtectedComponent requiredRole={ADMIN_ROLE}>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </ProtectedComponent>
                </tr>
                </thead>
                <tbody>
                {members.map((member) => (
                    <tr key={member.id} className="border-t border-gray-200">
                        <td className="px-4 py-2">{member.name} <span>{user?.userId == member.id && "(It`s You)"}</span>
                        </td>
                        <td className="px-4 py-2">
                            {isRoleAccepted(ADMIN_ROLE) ?
                                (<Select
                                    name={`role-${member.id}`}
                                    options={roles.map((role) => ({
                                        value: role.id,
                                        label: role.name,
                                    }))}
                                    value={roles.find((role) => (role.id === member.role))?.id || undefined}
                                    // onChange={(selectedOption) => onChangeRole(member.id, selectedOption?.value)}
                                    onChange={(roleId) =>
                                        handleChangeProjectMemberRole(member.id, Number(roleId))
                                    }
                                />)
                                : roles.find((role) => (role.id === member.role))?.name
                            }
                        </td>
                        <ProtectedComponent requiredRole={ADMIN_ROLE}>
                            <td className="px-4 py-2">
                                {user?.userId != member.id && (<Button
                                    className="btn-danger mr-2"
                                    onClick={() => handleDeleteProjectMember(member.id)}
                                    label="Delete"
                                />)}

                            </td>
                        </ProtectedComponent>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Add Member Modal */}
            <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} roles={roles}
                            onSubmit={handleCreateProjectRequest} onSearch={mockSearch}/>
        </div>
    );
};
