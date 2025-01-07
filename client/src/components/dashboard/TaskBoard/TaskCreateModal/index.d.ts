import { FC } from "react";
import { ProjectMember, TaskFormData, TaskStatus } from "@/types/dashboard/index";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => Promise<any>;
    taskStatuses: TaskStatus[];
    projectMembers: ProjectMember[];
}
export declare const TaskCreateModal: FC<ModalProps>;
export {};
