import { ProjectFormData } from "@/types/dashboard/index";
export declare const getUserProjects: () => Promise<any>;
export declare const getProject: (id: number) => Promise<any>;
export declare const getProjectMembers: (id: number) => Promise<any>;
export declare const deleteProjectMember: (id: number, userId: number) => Promise<any>;
export declare const changeProjectMemberRole: (id: number, userId: number, roleId: number) => Promise<any>;
export declare const createProject: (data: ProjectFormData) => Promise<any>;
export declare const editProject: (id: number, data: ProjectFormData) => Promise<any>;
export declare const deleteProject: (id: number) => Promise<any>;
