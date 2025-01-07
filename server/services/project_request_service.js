import ProjectRequest from "../models/ProjectRequest.js";

const projectRequestService = {
    getUserProjectRequests: async (email) => {
        return await ProjectRequest.getUserProjectRequests(email);
    },
    createProjectRequest: async (data) => {
        const isRequestExist = await ProjectRequest.getRequest(data.email, data.projectId);
        if (isRequestExist) {
            throw new Error('Request already sent');
        }

        const request = await ProjectRequest.createProjectRequest(data);
        if (!request) {
            throw new Error(`Failed to create request`);
        }
        return request;
    },
    acceptProjectRequest: async (email, userId, projectId) => {
        const request = await ProjectRequest.getRequest(email, projectId);
        if (!request) {
            throw new Error('Request doest not exist');
        }

        const data = {...request, userId};



        const result = await ProjectRequest.acceptProjectRequest(data);
        console.log({data});

        if (!result) {
            throw new Error(`Failed to accept project`);
        }

        return result;

    },
    declineProjectRequest: async (email, projectId) => {
        console.log({email, projectId});

        const request = await ProjectRequest.getRequest(email, projectId);
        if (!request) {
            throw new Error('Request doest not exist');
        }

        const result = await ProjectRequest.declineProjectRequest(email, projectId);
        if (!result) {
            throw new Error(`Failed to decline project`);
        }

        return result;
    }
}

export default projectRequestService;