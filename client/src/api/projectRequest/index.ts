import {axiosInstance} from "@api/instances/auth-instance";
import axios from "axios";
import {AddMemberFormData} from "@/types/dashboard";

export const getUserProjectRequests: (email: string) => Promise<any> =
    async (email) => {
        try {
            const response = await axiosInstance.get('/api/project_requests', {params: {email}});
            return response.data;
        } catch (error) {
            console.error('Failed to get project requests:', error);
            throw new Error('Failed to get project requests');
        }
    };

export const acceptProjectRequest: (projectId: number) => Promise<any> = async (projectId) => {
    try {
        const response = await axiosInstance.put('/api/project_request', {projectId});
        return response.data;
    } catch (error) {
        console.error('Failed to get accept requests:', error);
        throw new Error('Failed to get accept requests');
    }
}

export const declineProjectRequest: (projectId: number) => Promise<any> = async (projectId) => {
    try {
        const response = await axiosInstance.delete('/api/project_request', {params: {projectId}});
        return response.data;
    } catch (error) {
        console.error('Failed to get accept requests:', error);
        throw new Error('Failed to get accept requests');
    }
}

export const createProjectRequest: (data: AddMemberFormData, projectId: number) => Promise<any> =
    async (data, projectId) => {
        try {
            const response = await axiosInstance.post('/api/project_request', {...data, projectId});
            return response.data;
        } catch (error: any) {
            // Handle different types of errors
            if (axios.isAxiosError(error)) {
                // Axios-specific error
                console.error('Axios error:', error.response?.data || error.message);

                return {
                    success: false,
                    message: error.response?.data?.message || 'Failed to create project request',
                    status: error.response?.status || 500,
                };
            } else {
                // Non-Axios error (unexpected error)
                console.error('Unexpected error:', error);
                return {
                    success: false,
                    message: 'An unexpected error occurred',
                    status: 500,
                };
            }
        }
    };
