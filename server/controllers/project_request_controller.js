import pickProperties from '../utilities/pick_properties.js';
import projectRequestService from "../services/project_request_service.js";
import projectService from "../services/project_service.js";
import roleService from "../services/role_service.js";

const projectRequestController = {
    getUserProjectRequests: async (req, res) => {
        try {
            const {email} = req.query;
            const request = await projectRequestService.getUserProjectRequests(email);

            res.status(200).json({message: "Success", data: request});
        } catch (error) {
            res.status(400).send({message: error.message});
        }

    },
    createProjectRequest: async (req, res) => {
        try {
            const io = req.app.get('io');
            const {userId} = req.user;
            const keys = ['email', 'projectId', 'role'];
            const data = pickProperties(req.body, keys);
            data.requestUserId = userId;

            const request = await projectRequestService.createProjectRequest(data);
            const projectInfo = await projectService.getProjectById(data.requestUserId, data.projectId);
            const rolesInfo = await roleService.getRoles();
            const roleInfo = rolesInfo.find((role) => Number(role.id) === Number(data.role));

            io.to(data.email).emit('newProjectRequest', {
                id: request.id,
                sender: req.user.username,
                senderId: req.user.userId,
                projectName: projectInfo.name,
                projectId: projectInfo.id,
                roleName: roleInfo.name,
                roleId: roleInfo.id
            });

            res.status(200).json({message: "Success", data: request, success: true});
        } catch (error) {
            res.status(400).send({message: error.message, data: []});
        }
    },
    acceptProjectRequest: async (req, res) => {
        try {
            const {email, userId} = req.user;
            const {projectId} = req.body;
            const request = await projectRequestService.acceptProjectRequest(email, userId, projectId);

            res.status(200).json({message: "Success", data: request, success: true});
        } catch (error) {
            res.status(400).send({message: error.message, data: []});
        }
    },
    declineProjectRequest: async (req, res) => {
        try {
            const {email} = req.user;
            const {projectId} = req.query;
            const request = await projectRequestService.declineProjectRequest(email, projectId);
            res.status(200).json({message: "Success", data: request, success: true});
        } catch (error) {
            res.status(400).send({message: error.message, data: []});
        }
    }

};

export default projectRequestController;