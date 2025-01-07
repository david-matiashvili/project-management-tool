import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Header } from "@components/layout/Header";
import { ProjectList } from "@components/dashboard/ProjectList";
import { TaskBoard } from "@components/dashboard/TaskBoard";
import { ProjectMembers } from "@components/dashboard/ProjectMembers";
// Roles checker
import { RoleProvider } from "@/context/role/";
import { getUserProjects, createProject, getProject, editProject, deleteProject, getProjectMembers } from "@api/project/";
import { getRoles } from "@api/role/index";
import { toast } from "react-toastify";
export const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectMembers, setProjectMembers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [currentRole, setCurrentRole] = useState(NaN);
    const [isMembersShow, setIsMembersShow] = useState(false);
    const [reloadProjects, setReloadProjects] = useState(false);
    const [reloadProjectMembers, setReloadProjectMembers] = useState(false);
    useEffect(() => {
        const handleGetUserProjects = async () => {
            try {
                const { data } = await getUserProjects();
                setProjects(data);
            }
            catch (error) {
                toast.error("Failed to get projects");
            }
        };
        handleGetUserProjects();
    }, [reloadProjects]);
    useEffect(() => {
        const handleGetRoles = async () => {
            try {
                const { data } = await getRoles();
                setRoles(data);
            }
            catch (error) {
                toast.error("Failed to get roles");
            }
        };
        handleGetRoles();
    }, []);
    useEffect(() => {
        if (!selectedProject)
            return;
        handleGetProjectMembers(selectedProject.id);
    }, [reloadProjectMembers]);
    const handleGetProjectMembers = async (id) => {
        try {
            const { data } = await getProjectMembers(id);
            setProjectMembers(data);
        }
        catch (error) {
            toast.error("Failed to get members");
        }
    };
    const handleCreateProject = async (data) => {
        try {
            await createProject(data);
            setReloadProjects(!reloadProjects);
            toast.success("Project created successfully.");
        }
        catch (error) {
            toast.error("Failed to create a project");
        }
    };
    const handleEditProject = async (formData) => {
        try {
            if (selectedProject) {
                const { data } = await editProject(selectedProject.id, formData);
                setSelectedProject(data);
                toast.success("Project edited successfully");
            }
        }
        catch (error) {
            toast.error("Failed to edit a project");
        }
    };
    const handleSelectProject = async (project) => {
        try {
            const { data } = await getProject(project.id);
            setCurrentRole(Number(data.role_id));
            setSelectedProject(data);
            setIsMembersShow(false);
            await handleGetProjectMembers(project.id);
        }
        catch (error) {
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
        }
        catch (error) {
            toast.error("Failed to delete a project");
        }
    };
    return (_jsxs("div", { className: "h-screen", children: [_jsx(Header, {}), _jsx(RoleProvider, { currentRole: currentRole, children: _jsxs("div", { className: "flex h-max", children: [_jsx(ProjectList, { projects: projects, selectProject: handleSelectProject, handleCreateProject: handleCreateProject }), selectedProject && !isMembersShow && (_jsx(TaskBoard, { selectedProject: selectedProject, projectMembers: projectMembers, handleEditProject: handleEditProject, handleDeleteProject: handleDeleteProject, setIsMembersShow: setIsMembersShow })), selectedProject && isMembersShow && (_jsx(ProjectMembers, { members: projectMembers, roles: roles, selectedProject: selectedProject, setIsMembersShow: setIsMembersShow, setReloadProjectMembers: setReloadProjectMembers }))] }) })] }));
};
