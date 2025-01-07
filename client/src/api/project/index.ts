import {axiosInstance} from "@api/instances/auth-instance";
import {Project, ProjectFormData} from "@/types/dashboard/index";

export const getUserProjects: () => Promise<any> =
    async () => {
        try {
            const response = await axiosInstance.get('/api/projects');
            return response.data;
        } catch (error) {
            console.error('Failed to get user projects:', error);
            throw new Error('Users get error');
        }
    };
export const getProject: (id: number) => Promise<any> =
    async (id) => {
        try {
            const response = await axiosInstance.get(`/api/project/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to get project:', error);
            throw new Error('Failed to get project:');
        }
    }

export const getProjectMembers: (id: number) => Promise<any> = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/project/members/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get project members:', error);
        throw new Error('Failed to get project members:');
    }
}

export const deleteProjectMember: (id: number, userId: number) => Promise<any> = async (id, userId) => {
    try {
        const response = await axiosInstance.delete(`/api/project/member/${id}`, {params: {userId}});
        return response.data;
    } catch (error) {
        console.error('Failed to delete project member:', error);
        throw new Error('Failed to delete project member:');
    }
}

export const changeProjectMemberRole: (id: number, userId: number, roleId: number) => Promise<any> = async (id, userId, roleId) => {
    try {
        const response = await axiosInstance.patch(`/api/project/member/role/${id}`, {userId, roleId});
        return response.data;
    } catch (error) {
        console.error('Failed to change project member role:', error);
        throw new Error('Failed to delete project member role:');
    }
}

export const createProject: (data: ProjectFormData) => Promise<any> = async (data) => {
    try {
        const response = await axiosInstance.post('/api/project', {...data})
        return response.data;
    } catch (error) {
        console.error('Failed to create project:', error);
    }
}

export const editProject: (id: number, data: ProjectFormData) => Promise<any> = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/project/${id}`, {...data});
        return response.data;
    } catch (error) {
        console.error('Failed to edit project', error);
    }
}

export const deleteProject: (id: number) => Promise<any> = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/project/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete project', error);
    }
}