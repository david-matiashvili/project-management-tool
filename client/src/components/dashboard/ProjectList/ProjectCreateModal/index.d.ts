import { FC } from "react";
import { ProjectFormData } from "@/types/dashboard/index";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectFormData) => Promise<void>;
}
export declare const ProjectCreateModal: FC<ModalProps>;
export {};
