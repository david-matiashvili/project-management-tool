import React, {FC, useState} from "react";
import {Button} from "@components/common/Button";
import {Project, ProjectInRoles, ProjectFormData} from "@/types/dashboard/";
import {ProjectCreateModal} from "@components/dashboard/ProjectList/ProjectCreateModal/";

interface ProjectListProps {
    projects: ProjectInRoles[];
    selectProject: (project: Project) => void;
    handleCreateProject: (data: ProjectFormData) => Promise<any>;
}

export const ProjectList: FC<ProjectListProps> = ({projects, selectProject, handleCreateProject}) => {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const handleCreateProjectWrapper = async (data: ProjectFormData) => {
        await handleCreateProject(data);
        closeCreateModal();
    }

    return (
        <div className="w-1/4 h-screen p-4 bg-gray-100">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Projects</h2>

                <Button
                    onClick={openCreateModal}
                    className="btn-primary"
                    label="Create a New Project"
                />
            </div>


            <ul className="space-y-4">
                {projects.map((role) => (
                    <li
                        key={role.role_id}
                        className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                            {role.role_description}
                        </p>
                        <ul className="ml-4 space-y-2">
                            {role.data.map((project) => (
                                <li
                                    key={project.id}
                                    className="p-3 cursor-pointer text-gray-700 bg-gray-200 border-gray-500 rounded-lg shadow-sm hover:text-blue-600 hover:font-medium transition-colors"
                                    onClick={() => selectProject(project)}
                                >
                                    {project.name}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <ProjectCreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal}
                                onSubmit={handleCreateProjectWrapper}/>
        </div>
    );
};
