import TaskStatus from "../models/TaskStatus.js";

const taskStatusService = {
    getProjectTaskStatuses: async (projectId) => {
        const statuses = await TaskStatus.getProjectTaskStatuses(projectId);
        if (!statuses) {
            throw new Error(`No status found with provided user id: ${projectId}`);
        }

        return statuses;
    },
    createTaskStatus: async (data) => {
        const createdStatus = await TaskStatus.createTaskStatus(data);
        if (!createdStatus) {
            throw new Error(`Failed to create status`);
        }
        return createdStatus;
    },
    updateTaskStatus: async (id, data) => {
        const updatedStatus = await TaskStatus.updateTaskStatus(id, data);
        if (!updatedStatus) {
            throw new Error(`Failed to update status with provided id: ${id}`);
        }
        return updatedStatus;
    },
    deleteTaskStatus: async (id) => {
        const deletedStatus = await TaskStatus.deleteTaskStatus(id);
        if (!deletedStatus) {
            throw new Error(`Failed to delete status with provided id: ${id}`);
        }
        return deletedStatus;
    }
}

export default taskStatusService;