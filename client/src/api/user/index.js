import { axiosUnauthInstance } from "@api/instances/unauth-instance";
import { axiosInstance } from "@api/instances/auth-instance";
export const registerUser = async (username, email, password) => {
    try {
        const response = await axiosUnauthInstance.post('/auth/register', { username, email, password });
        return response.data;
    }
    catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration error');
    }
};
export const searchUsersByEmail = async (projectId, emailPattern) => {
    try {
        const response = await axiosInstance.get(`/api/users/${emailPattern}`, { params: { projectId } });
        return response.data;
    }
    catch (error) {
        console.error('Failed to search:', error);
        throw new Error('Search error');
    }
};
