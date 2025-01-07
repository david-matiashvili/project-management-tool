import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, ButtonV2 } from "@components/common/Button";
import { SettingsIcon } from "@components/common/icons/SettingsIcon";
import { TaskCard } from "@components/dashboard/TaskBoard/TaskCard";
import { ProjectSettingsModal } from "@components/dashboard/TaskBoard/ProjectSettingsModal";
import { TaskCreateModal } from "@components/dashboard/TaskBoard/TaskCreateModal";
import { TaskStatusCreateModal } from "@components/dashboard/TaskBoard/TaskStatusCreateModal";
import { TaskInfoModal } from "@components/dashboard/TaskBoard/TaskInfoModal";
import { createTaskStatus, getTaskStatuses } from "@api/taskStatus/";
import { changeTaskStatus, createTask, getTasks, updateTask, deleteTask } from "@api/task/";
import { toast } from "react-toastify";
import { ProtectedComponent, isRoleAccepted } from "@/context/role";
import { MANAGER_ROLE, ADMIN_ROLE } from "@/constants/roles_constants";
export const TaskBoard = ({ selectedProject, projectMembers, handleEditProject, handleDeleteProject, setIsMembersShow }) => {
    const [tasks, setTasks] = useState({});
    const [taskStatuses, setTaskStatuses] = useState([]);
    const [reloadTaskStatuses, setReloadTaskStatuses] = useState(false);
    const [isTasksLoader, setIsTasksLoader] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isTaskCreateModal, setIsTaskCreateModalOpen] = useState(false);
    const [isTaskStatusCreateModalOpen, setIsTaskStatusCreateModalOpen] = useState(false);
    const [isTaskInfoCreateModalOpen, setIsTaskInfoModalOpen] = useState(false);
    const [selectedTaskInfo, setSelectedTaskInfo] = useState();
    useEffect(() => {
        const handleGetTasksInfo = async () => {
            try {
                const taskStatusesData = await getTaskStatuses(selectedProject.id);
                const tasksData = await getTasks(selectedProject.id);
                setTaskStatuses(taskStatusesData.data);
                setTasks(tasksData.data);
            }
            catch (error) {
                toast.error("Failed to get tasks info");
            }
        };
        handleGetTasksInfo();
    }, [selectedProject.id, reloadTaskStatuses]);
    const openSettingsModal = () => setIsSettingsModalOpen(true);
    const closeSettingsModal = () => setIsSettingsModalOpen(false);
    const openTaskCreateModal = () => setIsTaskCreateModalOpen(true);
    const closeTaskCreateModal = () => setIsTaskCreateModalOpen(false);
    const openTaskStatusCreateModal = () => setIsTaskStatusCreateModalOpen(true);
    const closeTaskStatusCreateModal = () => setIsTaskStatusCreateModalOpen(false);
    const openTaskInfoModal = (statusId, id) => {
        if (!id || !statusId) {
            toast.error("Failed to get task info");
            return;
        }
        ;
        const selectedTask = tasks[statusId].find((task) => task.id === id);
        setSelectedTaskInfo(selectedTask);
        setIsTaskInfoModalOpen(true);
    };
    const closeTaskInfoModal = () => setIsTaskInfoModalOpen(false);
    const handleCreateTaskStatus = async (data) => {
        try {
            const dataWithProjId = { ...data, projectId: selectedProject.id };
            await createTaskStatus(dataWithProjId);
            setReloadTaskStatuses(!reloadTaskStatuses);
            toast.success("Task status created successfully");
        }
        catch (error) {
            toast.error("Failed to create task status");
        }
    };
    const handleChangeTaskStatus = async (taskId, newStatusId) => {
        try {
            setIsTasksLoader(true);
            const data = { newStatusId, projectId: selectedProject.id };
            await changeTaskStatus(taskId, data);
            setReloadTaskStatuses((prev) => !prev);
        }
        catch (error) {
            toast.error("Failed to change task status");
        }
        finally {
            setIsTasksLoader(false);
        }
    };
    const handleCreateTask = async (data) => {
        try {
            const dataWithProjId = { ...data, projectId: selectedProject.id };
            await createTask(dataWithProjId);
            setReloadTaskStatuses(!reloadTaskStatuses);
            toast.success("Task created successfully");
        }
        catch (error) {
            toast.error("Failed to create task");
        }
    };
    const handleUpdateTask = async (data, taskId) => {
        try {
            if (!taskId) {
                toast.error("Failed to update task");
                return;
            }
            const dataWithProjId = { ...data, projectId: selectedProject.id };
            await updateTask(taskId, dataWithProjId);
            setReloadTaskStatuses((prev) => !prev);
            toast.success("Task updated successfully");
        }
        catch (error) {
            toast.error("Failed to update task");
        }
    };
    const handleDeleteTask = async (taskId) => {
        try {
            if (!taskId) {
                toast.error("Failed to delete task");
                return;
            }
            await deleteTask(taskId, selectedProject.id);
            setReloadTaskStatuses((prev) => !prev);
            toast.success("Task deleted successfully");
        }
        catch (error) {
            toast.error("Failed to delete task");
        }
    };
    return (_jsxs("div", { className: "w-3/4 p-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-2xl font-bold", children: selectedProject.name }), _jsxs(ButtonV2, { onClick: openSettingsModal, className: "flex items-center btn-primary", children: [_jsx("span", { className: "mr-2 text-lg font-medium", children: isRoleAccepted(ADMIN_ROLE) ? "Settings" : "Project Info" }), _jsx(SettingsIcon, {})] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center justify-start", children: _jsxs(ProtectedComponent, { requiredRole: MANAGER_ROLE, children: [_jsx(Button, { onClick: openTaskCreateModal, className: "mt-4 px-4 btn-success", label: "Create New Task" }), _jsx(Button, { onClick: openTaskStatusCreateModal, className: "mt-4 ml-4 px-4 btn-primary", label: "Create New Status" })] }) }), _jsx("div", { className: "flex items-center justify-end", children: _jsx(Button, { onClick: () => {
                                setIsMembersShow(true);
                            }, className: "mt-4 ml-4 px-4 btn-primary", label: "Project Members" }) })] }), _jsx("h3", { className: "mt-6 text-xl font-semibold", children: selectedProject.board_name }), _jsx("div", { className: "overflow-x-auto", children: taskStatuses.length > 0 ?
                    _jsx("div", { className: "flex gap-5 w-max", children: taskStatuses.map((status) => (_jsx(TaskCard, { tasks: tasks[status?.id], status: status, moveTask: handleChangeTaskStatus, isLoading: isTasksLoader, openTaskInfoModal: openTaskInfoModal }, status.id))) })
                    : _jsx("div", { className: "text-gray-300 h-96 flex items-center justify-center", children: "No Task Fund" }) }), _jsx(ProjectSettingsModal, { onSubmit: handleEditProject, onClose: closeSettingsModal, isOpen: isSettingsModalOpen, selectedProject: selectedProject, onDelete: handleDeleteProject }), _jsxs(ProtectedComponent, { requiredRole: MANAGER_ROLE, children: [_jsx(TaskCreateModal, { onSubmit: handleCreateTask, onClose: closeTaskCreateModal, isOpen: isTaskCreateModal, taskStatuses: taskStatuses, projectMembers: projectMembers }), _jsx(TaskStatusCreateModal, { onSubmit: handleCreateTaskStatus, onClose: closeTaskStatusCreateModal, isOpen: isTaskStatusCreateModalOpen })] }), _jsx(TaskInfoModal, { onSubmit: async (data) => {
                    await handleUpdateTask(data, selectedTaskInfo?.id);
                }, onDelete: handleDeleteTask, taskStatuses: taskStatuses, projectMembers: projectMembers, userRole: selectedProject.role_id, selectedProjectId: selectedProject.id, onClose: closeTaskInfoModal, isOpen: isTaskInfoCreateModalOpen, taskId: selectedTaskInfo?.id })] }));
};
