import React, {FC, useEffect, useState} from "react";
import {Button, ButtonV2} from "@components/common/Button";
import {SettingsIcon} from "@components/common/icons/SettingsIcon";

import {TaskCard} from "@components/dashboard/TaskBoard/TaskCard";
import {ProjectSettingsModal} from "@components/dashboard/TaskBoard/ProjectSettingsModal";
import {TaskCreateModal} from "@components/dashboard/TaskBoard/TaskCreateModal";
import {TaskStatusCreateModal} from "@components/dashboard/TaskBoard/TaskStatusCreateModal";
import {TaskInfoModal} from "@components/dashboard/TaskBoard/TaskInfoModal";
import {
    Project,
    ProjectFormData,
    TaskStatus,
    TaskCollection,
    TaskStatusFormData, ProjectMember, TaskFormData, Task
} from "@/types/dashboard/";
import {createTaskStatus, getTaskStatuses} from "@api/taskStatus/";
import {changeTaskStatus, createTask, getTasks, updateTask, deleteTask} from "@api/task/";
import {toast} from "react-toastify";

import {ProtectedComponent, isRoleAccepted} from "@/context/role"
import {MANAGER_ROLE, ADMIN_ROLE} from "@/constants/roles_constants";

export interface TaskBoardProps {
    selectedProject: Project;
    projectMembers: ProjectMember[];
    handleEditProject: (project: ProjectFormData) => Promise<any>;
    handleDeleteProject: () => Promise<any>;
    setIsMembersShow: (isMembersShow: boolean) => void;
}

export const TaskBoard: FC<TaskBoardProps> = ({
                                                  selectedProject,
                                                  projectMembers,
                                                  handleEditProject,
                                                  handleDeleteProject,
                                                  setIsMembersShow
                                              }) => {
    const [tasks, setTasks] = useState<TaskCollection>({});
    const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
    const [reloadTaskStatuses, setReloadTaskStatuses] = useState<boolean>(false);
    const [isTasksLoader, setIsTasksLoader] = useState<boolean>(false);

    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isTaskCreateModal, setIsTaskCreateModalOpen] = useState(false);
    const [isTaskStatusCreateModalOpen, setIsTaskStatusCreateModalOpen] = useState(false);
    const [isTaskInfoCreateModalOpen, setIsTaskInfoModalOpen] = useState(false);
    const [selectedTaskInfo, setSelectedTaskInfo] = useState<Task | undefined>();

    useEffect(() => {
        const handleGetTasksInfo = async () => {
            try {
                const taskStatusesData = await getTaskStatuses(selectedProject.id);
                const tasksData = await getTasks(selectedProject.id);
                setTaskStatuses(taskStatusesData.data);
                setTasks(tasksData.data);
            } catch (error) {
                toast.error("Failed to get tasks info");
            }
        }

        handleGetTasksInfo();
    }, [selectedProject.id, reloadTaskStatuses]);


    const openSettingsModal = () => setIsSettingsModalOpen(true);
    const closeSettingsModal = () => setIsSettingsModalOpen(false);

    const openTaskCreateModal = () => setIsTaskCreateModalOpen(true);
    const closeTaskCreateModal = () => setIsTaskCreateModalOpen(false);

    const openTaskStatusCreateModal = () => setIsTaskStatusCreateModalOpen(true);
    const closeTaskStatusCreateModal = () => setIsTaskStatusCreateModalOpen(false);

    const openTaskInfoModal: (statusId: number | undefined, id: number | undefined) => void = (statusId, id) => {
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

    const handleCreateTaskStatus: (data: TaskStatusFormData) => Promise<void> = async (data) => {
        try {
            const dataWithProjId = {...data, projectId: selectedProject.id};
            await createTaskStatus(dataWithProjId);
            setReloadTaskStatuses(!reloadTaskStatuses);
            toast.success("Task status created successfully");
        } catch (error) {
            toast.error("Failed to create task status");
        }
    }
    const handleChangeTaskStatus: (taskId: number, newStatusId: number) => Promise<void> = async (taskId, newStatusId) => {
        try {
            setIsTasksLoader(true);
            const data = {newStatusId, projectId: selectedProject.id};
            await changeTaskStatus(taskId, data);
            setReloadTaskStatuses((prev) => !prev);
        } catch (error) {
            toast.error("Failed to change task status");
        } finally {
            setIsTasksLoader(false);
        }

    }

    const handleCreateTask: (data: TaskFormData) => Promise<void> = async (data) => {
        try {
            const dataWithProjId = {...data, projectId: selectedProject.id};
            await createTask(dataWithProjId);
            setReloadTaskStatuses(!reloadTaskStatuses);
            toast.success("Task created successfully");
        } catch (error) {
            toast.error("Failed to create task");
        }
    }

    const handleUpdateTask: (data: TaskFormData, taskId: number | undefined) => Promise<void> = async (data, taskId) => {
        try {
            if (!taskId) {
                toast.error("Failed to update task");
                return;
            }
            const dataWithProjId = {...data, projectId: selectedProject.id};
            await updateTask(taskId, dataWithProjId);
            setReloadTaskStatuses((prev) => !prev);
            toast.success("Task updated successfully");
        } catch (error) {
            toast.error("Failed to update task");
        }
    }

    const handleDeleteTask: (taskId: number | undefined) => Promise<void> = async (taskId) => {
        try {
            if (!taskId) {
                toast.error("Failed to delete task");
                return;
            }

            await deleteTask(taskId, selectedProject.id);
            setReloadTaskStatuses((prev) => !prev);
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error("Failed to delete task");
        }
    }

    return (
        <div className="w-3/4 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedProject.name}</h2>

                <ButtonV2 onClick={openSettingsModal} className="flex items-center btn-primary">
                    <span
                        className="mr-2 text-lg font-medium">{isRoleAccepted(ADMIN_ROLE) ? "Settings" : "Project Info"}</span>
                    <SettingsIcon/>
                </ButtonV2>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    <ProtectedComponent requiredRole={MANAGER_ROLE}>
                        <Button onClick={openTaskCreateModal}
                                className="mt-4 px-4 btn-success"
                                label="Create New Task"/>

                        <Button onClick={openTaskStatusCreateModal}
                                className="mt-4 ml-4 px-4 btn-primary"
                                label="Create New Status"/>
                    </ProtectedComponent>
                </div>
                <div className="flex items-center justify-end">
                    <Button onClick={() => {
                        setIsMembersShow(true)
                    }}
                            className="mt-4 ml-4 px-4 btn-primary"
                            label="Project Members"/>
                </div>
            </div>
            <h3 className="mt-6 text-xl font-semibold">{selectedProject.board_name}</h3>
            <div className="overflow-x-auto">
                {taskStatuses.length > 0 ?
                    <div className="flex gap-5 w-max">
                        {
                            taskStatuses.map((status) => (
                                <TaskCard tasks={tasks[status?.id]} status={status} key={status.id}
                                          moveTask={handleChangeTaskStatus} isLoading={isTasksLoader}
                                          openTaskInfoModal={openTaskInfoModal}/>
                            ))}
                    </div>
                    : <div className="text-gray-300 h-96 flex items-center justify-center">No Task Fund</div>}
            </div>

            <ProjectSettingsModal
                onSubmit={handleEditProject} onClose={closeSettingsModal} isOpen={isSettingsModalOpen}
                selectedProject={selectedProject}
                onDelete={handleDeleteProject}/>

            <ProtectedComponent requiredRole={MANAGER_ROLE}>
                <TaskCreateModal onSubmit={handleCreateTask} onClose={closeTaskCreateModal} isOpen={isTaskCreateModal}
                                 taskStatuses={taskStatuses} projectMembers={projectMembers}/>
                <TaskStatusCreateModal onSubmit={handleCreateTaskStatus} onClose={closeTaskStatusCreateModal}
                                       isOpen={isTaskStatusCreateModalOpen}/>
            </ProtectedComponent>
            <TaskInfoModal onSubmit={async (data) => {
                await handleUpdateTask(data, selectedTaskInfo?.id);
            }} onDelete={handleDeleteTask} taskStatuses={taskStatuses} projectMembers={projectMembers}
                           userRole={selectedProject.role_id}
                           selectedProjectId={selectedProject.id}
                           onClose={closeTaskInfoModal} isOpen={isTaskInfoCreateModalOpen}
                           taskId={selectedTaskInfo?.id}/>
        </div>
    )
};