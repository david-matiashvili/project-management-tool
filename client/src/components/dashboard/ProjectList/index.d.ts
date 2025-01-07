import { FC } from "react";
import { Project, ProjectInRoles, ProjectFormData } from "@/types/dashboard/";
interface ProjectListProps {
    projects: ProjectInRoles[];
    selectProject: (project: Project) => void;
    handleCreateProject: (data: ProjectFormData) => Promise<any>;
}
export declare const ProjectList: FC<ProjectListProps>;
export {};
