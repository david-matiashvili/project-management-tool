import { FC } from "react";
import { Project, ProjectFormData } from "@/types/dashboard/index";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectFormData) => Promise<any>;
    onDelete: () => Promise<any>;
    selectedProject: Project;
}
export declare const ProjectSettingsModal: FC<ModalProps>;
export {};
