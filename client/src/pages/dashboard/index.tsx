import React, {useEffect, useState} from 'react';
import {Header} from "@components/layout/Header";
import {ProjectList} from "@components/dashboard/ProjectList";
import {Project, ProjectInRoles, Task, ProjectFormData, ProjectMember, Role} from "@/types/dashboard";
import {TaskBoard} from "@components/dashboard/TaskBoard";
import {ProjectMembers} from "@components/dashboard/ProjectMembers"

// Roles checker
import {RoleProvider} from "@/context/role/";

import {getUserProjects, createProject, getProject, editProject, deleteProject, getProjectMembers} from "@api/project/";
import {getRoles} from "@api/role/index";

import {toast} from "react-toastify";

export const Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<ProjectInRoles[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [currentRole, setCurrentRole] = useState<number>(NaN);
    const [isMembersShow, setIsMembersShow] = useState<boolean>(false);

    const [reloadProjects, setReloadProjects] = useState<boolean>(false);
    const [reloadProjectMembers, setReloadProjectMembers] = useState<boolean>(false);

    useEffect(() => {
        const handleGetUserProjects = async () => {
            try {
                const {data} = await getUserProjects();
                setProjects(data);
            } catch (error) {
                toast.error("Failed to get projects");
            }
        }

        handleGetUserProjects();
    }, [reloadProjects])

    useEffect(() => {
        const handleGetRoles = async () => {
            try {
                const {data} = await getRoles();
                setRoles(data);
            } catch (error) {
                toast.error("Failed to get roles");
            }
        }

        handleGetRoles();
    }, []);

    useEffect(() => {
        if (!selectedProject) return;

        handleGetProjectMembers(selectedProject.id);
    }, [reloadProjectMembers]);


    const handleGetProjectMembers = async (id: number) => {
        try {
            const {data} = await getProjectMembers(id);
            setProjectMembers(data);
        } catch (error) {
            toast.error("Failed to get members");
        }
    }

    const handleCreateProject = async (data: ProjectFormData) => {
        try {
            await createProject(data);
            setReloadProjects(!reloadProjects);
            toast.success("Project created successfully.");
        } catch (error) {
            toast.error("Failed to create a project");
        }
    };

    const handleEditProject = async (formData: ProjectFormData) => {
        try {
            if (selectedProject) {
                const {data} = await editProject(selectedProject.id, formData);
                setSelectedProject(data);
                toast.success("Project edited successfully");
            }
        } catch (error) {
            toast.error("Failed to edit a project");
        }
    }

    const handleSelectProject = async (project: Project) => {
        try {
            const {data} = await getProject(project.id);
            setCurrentRole(Number(data.role_id));
            setSelectedProject(data);
            setIsMembersShow(false);
            await handleGetProjectMembers(project.id);
        } catch (error) {
            toast.error("Failed to select project");
        }
    };

    const handleDeleteProject = async () => {
        try {
            if (selectedProject) {
                await deleteProject(selectedProject?.id);
                setSelectedProject(null);
                setReloadProjects(!reloadProjects);
                toast.success("Project deleted successfully");
            }
        } catch (error) {
            toast.error("Failed to delete a project");
        }

    }

    return (
        <div className="h-screen">
            <Header/>
            <RoleProvider currentRole={currentRole}>
                <div className="flex h-max">
                    <ProjectList projects={projects} selectProject={handleSelectProject}
                                 handleCreateProject={handleCreateProject}/>
                    {selectedProject && !isMembersShow && (
                        <TaskBoard selectedProject={selectedProject} projectMembers={projectMembers}
                                   handleEditProject={handleEditProject} handleDeleteProject={handleDeleteProject}
                                   setIsMembersShow={setIsMembersShow}/>
                    )}
                    {selectedProject && isMembersShow && (
                        <ProjectMembers members={projectMembers} roles={roles} selectedProject={selectedProject}
                                        setIsMembersShow={setIsMembersShow} setReloadProjectMembers={setReloadProjectMembers}/>
                    )}
                </div>
            </RoleProvider>
        </div>
    );
};
