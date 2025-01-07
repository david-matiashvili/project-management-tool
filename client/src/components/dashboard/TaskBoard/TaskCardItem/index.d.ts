import { FC } from "react";
import { Task, TaskStatus } from "@/types/dashboard/";
export interface TaskCardItemProps {
    task?: Task;
    status?: TaskStatus;
    openTaskInfoModal: (statusId: number | undefined, id: number | undefined) => void;
}
export declare const TaskCardItem: FC<TaskCardItemProps>;
