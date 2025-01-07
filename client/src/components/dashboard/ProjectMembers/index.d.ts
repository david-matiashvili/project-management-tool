import React, { FC } from "react";
import { Project, ProjectMember, Role } from "@/types/dashboard";
interface MembersTableProps {
    members: ProjectMember[];
    roles: Role[];
    selectedProject: Project;
    setIsMembersShow: (isMembersShow: boolean) => void;
    setReloadProjectMembers: React.Dispatch<React.SetStateAction<boolean>>;
}
export declare const ProjectMembers: FC<MembersTableProps>;
export {};
