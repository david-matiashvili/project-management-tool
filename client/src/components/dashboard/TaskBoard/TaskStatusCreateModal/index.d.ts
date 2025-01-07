import { FC } from "react";
import { TaskStatusFormData } from "@/types/dashboard/index";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskStatusFormData) => Promise<any>;
}
export declare const TaskStatusCreateModal: FC<ModalProps>;
export {};
