import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDrag } from "react-dnd";
import { priorityCycles } from "@/constants/priorityCycles";
import { convertDateToInput } from "@/helpers/convertDateToInput";
export const TaskCardItem = ({ task, status, openTaskInfoModal }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { taskId: task?.id, statusId: status?.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return (_jsxs("div", { ref: drag, className: `p-2 rounded shadow-sm border-gray-100 border-2 cursor-pointer ${isDragging ? "opacity-50" : ""}`, onClick: () => {
            openTaskInfoModal(status?.id, task?.id);
        }, children: [_jsx("h3", { className: "text-sm mb-3 text-gray-700", children: task?.title }), _jsx("p", { className: "text-xs w-max p-1 rounded mr-2 text-gray-700", style: { background: status?.color }, children: status?.title }), _jsxs("div", { className: "flex flex-row items-center mt-2", children: [task?.priority_id !== undefined && priorityCycles[task.priority_id] ? (_jsxs("div", { title: `${task?.priority_name}  priority`, children: [" ", priorityCycles[task.priority_id], " "] })) : (_jsx("div", { title: "No prioritize", className: "bg-gray-300 rounded-full w-4 h-4 mr-3" })), _jsx("a", { href: "#", className: "text-xs text-gray-500", children: task?.assigned_to_name })] }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: convertDateToInput(task?.deadline ?? "") })] }));
};
