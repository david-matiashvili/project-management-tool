import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TaskCardItem } from "@components/dashboard/TaskBoard/TaskCardItem";
import { useDrop } from "react-dnd";
export const TaskCard = ({ tasks, status, moveTask, isLoading, openTaskInfoModal }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => {
            if (item.statusId !== status.id) {
                moveTask(item.taskId, status.id);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    return (_jsxs("div", { ref: drop, className: `bg-white rounded px-2 py-2 w-80 ${isOver ? "bg-gray-100" : ""} ${isLoading ? "opacity-50" : ""}`, children: [_jsx("div", { className: "flex flex-row justify-between items-center mb-2 mx-1", children: _jsxs("div", { className: "flex items-center", children: [_jsx("h2", { className: "font-bold text-sm w-max px-1 rounded mr-2 text-gray-700", style: { background: status.color }, children: status.title }), _jsx("p", { className: "text-gray-400 text-sm", children: tasks?.length || 0 })] }) }), _jsx("div", { className: "grid gap-2", children: tasks && tasks.map((task) => (_jsx(TaskCardItem, { task: task, status: status, openTaskInfoModal: openTaskInfoModal }, task.id))) }), _jsxs("div", { className: "flex flex-row items-center text-gray-300 mt-2 px-1", children: [_jsx("p", { className: "rounded mr-2 text-2xl", children: "+" }), _jsx("p", { className: "pt-1 rounded text-sm", children: "New" })] })] }));
};
