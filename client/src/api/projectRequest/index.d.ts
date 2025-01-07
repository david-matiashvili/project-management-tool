import { AddMemberFormData } from "@/types/dashboard";
export declare const getUserProjectRequests: (email: string) => Promise<any>;
export declare const acceptProjectRequest: (projectId: number) => Promise<any>;
export declare const declineProjectRequest: (projectId: number) => Promise<any>;
export declare const createProjectRequest: (data: AddMemberFormData, projectId: number) => Promise<any>;
