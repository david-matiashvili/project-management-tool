export interface Project {
    id: number;
    name: string;
    description?: string;
    board_name?: string;
    role_id: string;
}

export interface ProjectFormData {
    name: string;
    description?: string;
    board_name?: string;
}

export interface ProjectInRoles {
    role_description: string;
    role_id: number;
    data: Project[];
}

export interface Task {
    id: number;
    title: string;
    body: string;
    deadline: string | Date;
    creator_name: string;
    creator_id?: number;
    assigned_to_name: string;
    assigned_to_id: number;
    status_id: number;
    priority_id: number;
    priority_name: string;
}

export interface TaskCollection {
    [statusId: number]: Task[];
}

export interface TaskFormData {
    title: string;
    body: string;
    statusId: string;
    assignedTo: string;
    deadline: string;
    priority: string;
}

export interface TaskInfo extends TaskFormData {
    id: number;
    creatorId: number;
}

export interface TaskStatusFormData {
    title: string;
    color: string;
}

export interface TaskStatus {
    title: string;
    id: number;
    color?: string;
}

export interface TaskStatusChangeData {
    newStatusId: number;
    projectId: number;
}

export interface ProjectMember {
    id: number;
    name: string;
    role?: number;
}

export interface Role {
    id: number;
    description: string;
    name: string;
    title: string;
}

export interface AddMemberFormData {
    email: string;
    role: string;
}

export interface ProjectRequest {
    id: number;
    roleId: number;
    roleName: string;
    projectId: number;
    projectName: string;
    sender: string;
    senderId: number;
}
