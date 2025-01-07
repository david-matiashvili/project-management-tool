import React, {FC} from "react";
import {TaskCardItem} from "@components/dashboard/TaskBoard/TaskCardItem";
import {useDrop} from "react-dnd";
import {Task, TaskStatus} from "@/types/dashboard/";

export interface TaskCardProps {
    tasks: Task[];
    status: TaskStatus;
    moveTask: (taskId: number, newStatusId: number) => void;
    isLoading: boolean;
    openTaskInfoModal: (statusId: number | undefined, id: number | undefined) => void;
}

export const TaskCard: FC<TaskCardProps> = ({tasks, status, moveTask, isLoading, openTaskInfoModal}) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item: { taskId: number; statusId: number }) => {
            if (item.statusId !== status.id) {
                moveTask(item.taskId, status.id);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop}
             className={`bg-white rounded px-2 py-2 w-80 ${isOver ? "bg-gray-100" : ""} ${isLoading ? "opacity-50" : ""}`}>
            <div className="flex flex-row justify-between items-center mb-2 mx-1">
                <div className="flex items-center">
                    <h2 className="font-bold text-sm w-max px-1 rounded mr-2 text-gray-700"
                        style={{background: status.color}}>
                        {status.title}
                    </h2>
                    <p className="text-gray-400 text-sm">{tasks?.length || 0}</p>
                </div>
            </div>
            <div className="grid gap-2">
                {tasks && tasks.map((task: Task) => (
                    <TaskCardItem task={task} status={status} key={task.id} openTaskInfoModal={openTaskInfoModal}/>))}
            </div>
            <div className="flex flex-row items-center text-gray-300 mt-2 px-1">
                <p className="rounded mr-2 text-2xl">+</p>
                <p className="pt-1 rounded text-sm">New</p>
            </div>
        </div>
    );
};