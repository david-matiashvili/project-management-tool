import { TaskFormData, TaskStatusChangeData } from "@/types/dashboard/";
export declare const getTasks: (projectId: number) => Promise<any>;
export declare const getTask: (projectId: number, taskId: number) => Promise<any>;
export declare const createTask: (data: TaskFormData) => Promise<any>;
export declare const updateTask: (id: number, data: TaskFormData) => Promise<any>;
export declare const deleteTask: (id: number, projectId: number) => Promise<any>;
export declare const assignTask: (id: number) => Promise<any>;
export declare const changeTaskStatus: (id: number, data: TaskStatusChangeData) => Promise<any>;
