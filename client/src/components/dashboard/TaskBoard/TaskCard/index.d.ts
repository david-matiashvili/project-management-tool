import { FC } from "react";
import { Task, TaskStatus } from "@/types/dashboard/";
export interface TaskCardProps {
    tasks: Task[];
    status: TaskStatus;
    moveTask: (taskId: number, newStatusId: number) => void;
    isLoading: boolean;
    openTaskInfoModal: (statusId: number | undefined, id: number | undefined) => void;
}
export declare const TaskCard: FC<TaskCardProps>;
