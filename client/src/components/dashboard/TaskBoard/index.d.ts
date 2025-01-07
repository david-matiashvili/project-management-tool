import { FC } from "react";
import { Project, ProjectFormData, ProjectMember } from "@/types/dashboard/";
export interface TaskBoardProps {
    selectedProject: Project;
    projectMembers: ProjectMember[];
    handleEditProject: (project: ProjectFormData) => Promise<any>;
    handleDeleteProject: () => Promise<any>;
    setIsMembersShow: (isMembersShow: boolean) => void;
}
export declare const TaskBoard: FC<TaskBoardProps>;
