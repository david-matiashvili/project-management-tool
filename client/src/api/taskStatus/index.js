import { axiosInstance } from "@api/instances/auth-instance";
export const getTaskStatuses = async (projectId) => {
    try {
        const response = await axiosInstance.get('/api/task_statuses', {
            params: { projectId }
        });
        return response.data;
    }
    catch (error) {
        console.error('Failed to get task statuses:', error);
    }
};
export const createTaskStatus = async (data) => {
    try {
        const response = await axiosInstance.post('/api/task_status', { ...data });
        return response.data;
    }
    catch (error) {
        console.error('Failed to create task status:', error);
    }
};
export const updateTaskStatus = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/task_status/${id}`, { ...data });
        return response.data;
    }
    catch (error) {
        console.error('Failed to edit task', error);
    }
};
export const deleteTaskStatus = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/task_status/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to delete task', error);
    }
};
export const assignTaskStatus = async (id) => {
    try {
        const response = await axiosInstance.patch(`/api/task_status/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to assign task', error);
    }
};
