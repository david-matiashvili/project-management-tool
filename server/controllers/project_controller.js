import projectService from '../services/project_service.js';
import pickProperties from '../utilities/pick_properties.js';

const projectController = {
    getProjectById: async (req, res) => {
        try {
            const {userId} = req.user;
            const {projectId} = req.params;
            const project = await projectService.getProjectById(userId, projectId);
            res.status(200).json({message: "Success", data: project});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    getUserProjects: async (req, res) => {
        try {
            const {userId} = req.user;

            const project = await projectService.getUserProjects(userId);
            res.status(200).json({message: "Success", data: project});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    getProjectMembers: async (req, res) => {
        try {
            const {projectId} = req.params;

            const members = await projectService.getProjectMembers(projectId);
            res.status(200).json({message: "Success", data: members});
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    },
    addProjectMember: async (req, res) => {
        try {
            const {projectId} = req.params;
            const {priority, userId} = req.body;

            const member = await projectService.addProjectMember(projectId, userId, priority);
            res.status(200).json({message: "Success", data: member});
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    },
    deleteProjectMember: async (req, res) => {
        try {
            const {projectId} = req.params;
            const {userId} = req.query;

            const member = await projectService.deleteProjectMember(projectId, userId);
            res.status(200).json({message: "Success", data: member, success: true});
        } catch (error) {
            res.status(400).send({error: error.message, success: false})
        }
    },
    changeProjectMemberRole: async (req, res) => {
        try {
            const {projectId} = req.params;
            const {userId, roleId} = req.body;

            const member = await projectService.changeProjectMemberRole(projectId, userId, roleId);
            res.status(200).json({message: "Success", data: member, success: true});
        } catch (error) {
            res.status(400).send({error: error.message, success: false});
        }
    },
    createProject: async (req, res) => {
        try {
            const keys = ['name', 'description', 'board_name', 'userId'];
            const data = pickProperties({...req.body, ...req.user}, keys);
            const createdProject = await projectService.createProject(data);
            res.status(200).json({message: 'Project created successfully.', data: createdProject});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    updateProject: async (req, res) => {
        try {
            const keys = ['name', 'description', 'board_name', 'userId'];
            const data = pickProperties({...req.body, ...req.user}, keys);
            const {projectId} = req.params;
            const updatedProject = await projectService.updateProject(projectId, data);
            res.status(200).json({message: 'Project updated successfully.', data: updatedProject});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    deleteProject: async (req, res) => {
        try {
            const {projectId} = req.params;
            const deletedProject = await projectService.deleteProject(projectId);
            res.status(200).json({message: 'Project deleted successfully.', data: deletedProject})
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    // getProjects: async (req, res) => {
    //     try {
    //         const {ids} = req.body;
    //         const projects = await projectService.getProjects(ids);
    //         res.status(200).json({message: "Success", data: projects});
    //     } catch (error) {
    //         res.status(400).send({error: error.message});
    //     }
    // },
    // deleteProjects: async (req, res) => {
    //     const {ids} = req.body;
    //     const deletedProjects = Project.getProjects(ids);
    //     if (!deletedProjects) {
    //         throw new Error(`No project found with provided ids: ${ids}`);
    //     }
    //     return deletedProjects;
    // }
}

export default projectController;