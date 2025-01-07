import Project from "../../models/Project.js";

const getUserRoleInProject = async (req) => {
    const userId = req.user.userId;
    const projectId = req.params.projectId || req.body.projectId || req.query.projectId;

    if (!projectId) {
        return {status: 401, message: 'Project ID is required', role_id: ''};
    }

    const result = await Project.getUserProjectRole(userId, projectId);
    const {role_id} = result || {};
    if (!role_id) {
        return {status: 401, message: 'Project not found', role_id: ''};
    }

    return {status: 200, message: 'Success', role_id};
}

export default getUserRoleInProject;