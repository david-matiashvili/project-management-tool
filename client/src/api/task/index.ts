import {axiosInstance} from "@api/instances/auth-instance";
import {TaskFormData, TaskStatusChangeData} from "@/types/dashboard/";

export const getTasks: (projectId: number) => Promise<any> =
    async (projectId) => {
        try {
            const response = await axiosInstance.get('/api/tasks', {
                params: {projectId}
            });
            return response.data;
        } catch (error) {
            console.error('Failed to get tasks:', error);
            throw new Error('Failed to get tasks');
        }
    };

export const getTask: (projectId: number, taskId: number) => Promise<any> =
    async (projectId, taskId) => {
        try {
            const response = await axiosInstance.get(`/api/task/${taskId}`, {params: {projectId}});
            return response.data;
        } catch (error) {
            console.error('Failed to get task:', error);
            throw new Error('Failed to get task');
        }
    };

export const createTask: (data: TaskFormData) => Promise<any> = async (data) => {
    try {
        const response = await axiosInstance.post('/api/task', {...data})
        return response.data;
    } catch
        (error) {
        console.error('Failed to create task:', error);
        throw new Error('Failed to create task');
    }
}

export const updateTask: (id: number, data: TaskFormData) => Promise<any> = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/task/${id}`, {...data});
        return response.data;
    } catch (error) {
        console.error('Failed to edit task', error);
        throw new Error('Failed to edit task');
    }
}

export const deleteTask: (id: number, projectId: number) => Promise<any> = async (id, projectId) => {
    try {
        const response = await axiosInstance.delete(`/api/task/${id}`, {params: {projectId}});
        return response.data;
    } catch (error) {
        console.error('Failed to delete task', error);
        throw new Error('Failed to delete task');
    }
}

export const assignTask: (id: number) => Promise<any> = async (id) => {
    try {
        const response = await axiosInstance.patch(`/api/task/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to assign task', error);
        throw new Error('Failed to assign task');
    }
}

export const changeTaskStatus: (id: number, data: TaskStatusChangeData) => Promise<any> = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/api/task/status/${id}`, {...data});
        return response.data;
    } catch (error) {
        console.error('Failed to change task status', error);
        throw new Error('Failed to change task status');
    }
}