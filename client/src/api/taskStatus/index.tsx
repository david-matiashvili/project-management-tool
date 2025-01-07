import {axiosInstance} from "@api/instances/auth-instance";
import {TaskStatusFormData} from "@/types/dashboard/";

export const getTaskStatuses: (projectId: number) => Promise<any> =
    async (projectId) => {
        try {
            const response = await axiosInstance.get('/api/task_statuses', {
                params: {projectId}
            });
            return response.data;
        } catch (error) {
            console.error('Failed to get task statuses:', error);
        }
    };

export const createTaskStatus: (data: TaskStatusFormData) => Promise<any> = async (data) => {
    try {
        const response = await axiosInstance.post('/api/task_status', {...data})
        return response.data;
    } catch (error) {
        console.error('Failed to create task status:', error);
    }
}

export const updateTaskStatus: (id: number, data: TaskStatusFormData) => Promise<any> = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/task_status/${id}`, {...data});
        return response.data;
    } catch (error) {
        console.error('Failed to edit task', error);
    }
}

export const deleteTaskStatus: (id: number) => Promise<any> = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/task_status/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete task', error);
    }
}

export const assignTaskStatus: (id: number) => Promise<any> = async (id) => {
    try {
        const response = await axiosInstance.patch(`/api/task_status/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to assign task', error);
    }
}