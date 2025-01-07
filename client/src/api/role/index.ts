import {axiosInstance} from "@api/instances/auth-instance";


export const getRoles: () => Promise<any> =
    async () => {
        try {
            const response = await axiosInstance.get('/api/roles');
            return response.data;
        } catch (error) {
            console.error('Failed to get user projects:', error);
            throw new Error('Registration error');
        }
    };