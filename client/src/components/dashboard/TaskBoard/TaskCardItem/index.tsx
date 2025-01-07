import React, {FC} from "react";
import {useDrag} from "react-dnd";
import {Task, TaskStatus} from "@/types/dashboard/";
import {priorityCycles} from "@/constants/priorityCycles";
import {convertDateToInput} from "@/helpers/convertDateToInput";

export interface TaskCardItemProps {
    task?: Task;
    status?: TaskStatus;
    openTaskInfoModal: (statusId: number | undefined, id: number | undefined) => void;
}

export const TaskCardItem: FC<TaskCardItemProps> = ({task, status, openTaskInfoModal}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "TASK",
        item: {taskId: task?.id, statusId: status?.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-2 rounded shadow-sm border-gray-100 border-2 cursor-pointer ${
                isDragging ? "opacity-50" : ""
            }`}
            onClick={() => {
                openTaskInfoModal(status?.id, task?.id);
            }}
        >
            <h3 className="text-sm mb-3 text-gray-700">{task?.title}</h3>
            <p className="text-xs w-max p-1 rounded mr-2 text-gray-700" style={{background: status?.color}}>
                {status?.title}
            </p>
            <div className="flex flex-row items-center mt-2">
                {task?.priority_id !== undefined && priorityCycles[task.priority_id] ? (
                    <div title={`${task?.priority_name}  priority`}> {priorityCycles[task.priority_id]} </div>
                ) : (
                    <div title="No prioritize" className="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
                )}
                <a href="#" className="text-xs text-gray-500">{task?.assigned_to_name}</a>
            </div>
            <p className="text-xs text-gray-500 mt-2">{convertDateToInput(task?.deadline ?? "")}</p>
        </div>
    );
};
