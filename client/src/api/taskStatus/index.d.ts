import { TaskStatusFormData } from "@/types/dashboard/";
export declare const getTaskStatuses: (projectId: number) => Promise<any>;
export declare const createTaskStatus: (data: TaskStatusFormData) => Promise<any>;
export declare const updateTaskStatus: (id: number, data: TaskStatusFormData) => Promise<any>;
export declare const deleteTaskStatus: (id: number) => Promise<any>;
export declare const assignTaskStatus: (id: number) => Promise<any>;
