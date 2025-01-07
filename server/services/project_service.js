import Project from "../models/Project.js";
import {sortProjectsWithRoles} from "../helpers/projects/sort_projects_with_roles.js"

const projectService = {
    getProjectById: async (userId, projectId) => {
        const project = await Project.getProjectById(userId, projectId);
        if (!project) {
            throw new Error(`Project not found`);
        }
        return project;
    },
    getProjects: async (ids) => {
        const projects = await Project.getProjects(ids);
        if (!projects) {
            throw new Error(`No project found with provided ids: ${ids}`);
        }
        return projects;
    },
    getUserProjects: async (userId) => {
        const projects = await Project.getUserProjects(userId);
        if (!projects) {
            throw new Error(`No project found with provided user id: ${userId}`);
        }

        return sortProjectsWithRoles(projects);
    },
    getProjectMembers: async (projectId) => {
        const members = await Project.getProjectMembers(projectId);
        if (!members) {
            throw new Error(`Failed to get project members`);
        }
        return members;
    },
    addProjectMember: async (projectId, userId, priority) => {
        const member = await Project.addProjectMember(projectId, userId, priority);
        console.log(member);
        if (!member) {
            throw new Error("Failed to add project member");
        }
        return member;
    },
    deleteProjectMember: async (projectId, userId) => {
        const member = await Project.deleteProjectMember(projectId, userId);
        if (!member) {
            throw new Error("Failed to remove project member");
        }
        return member;
    },
    changeProjectMemberRole: async (projectId, userId, roleId) => {
        const member = await Project.changeProjectMemberRole(projectId, userId, roleId);
        if (!member) {
            throw new Error("Failed to remove project member");
        }
        return member;
    },
    createProject: async (data) => {
        const createdProject = await Project.createProject(data);
        if (!createdProject) {
            throw new Error(`Failed to create project`);
        }
        return createdProject;
    },
    updateProject: async (id, data) => {
        const updatedProject = await Project.updateProject(id, data);
        if (!updatedProject) {
            throw new Error(`Failed to update project with provided id: ${id}`);
        }
        return updatedProject;
    },
    deleteProject: async (id) => {
        const deletedProject = await Project.deleteProject(id);
        if (!deletedProject) {
            throw new Error(`Failed to delete project with provided id: ${id}`);
        }
        return deletedProject;
    },
    deleteProjects: async (ids) => {
        const deletedProjects = Project.getProjects(ids);
        if (!deletedProjects) {
            throw new Error(`No project found with provided ids: ${ids}`);
        }
        return deletedProjects;
    }
}

export default projectService;