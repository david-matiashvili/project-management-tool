import { FC } from "react";
import { ProjectMember, TaskFormData, TaskStatus } from "@/types/dashboard/index";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => Promise<any>;
    onDelete: (id: number | undefined) => Promise<void>;
    taskStatuses: TaskStatus[];
    projectMembers: ProjectMember[];
    userRole: string;
    taskId?: number;
    selectedProjectId: number;
}
export declare const TaskInfoModal: FC<ModalProps>;
export {};
