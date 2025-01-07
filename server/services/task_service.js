import Task from "../models/Task.js";
import {sortTasksWithStatuses} from "../helpers/tasks/sortTasksWithStatuses.js";

const taskService = {
    getTasks: async (projectId) => {
        const tasks = await Task.getTasks(projectId);
        if (!tasks) {
            throw new Error(`No task found with provided project id: ${projectId}`);
        }
        return sortTasksWithStatuses(tasks);
    },
    getTask: async (id, projectId) => {
        const taskInfo = await Task.getTask(id, projectId);
        if (!taskInfo) {
            throw new Error(`Failed to get task info with provided id: ${id}`);
        }
        return taskInfo;
    },
    createTask: async (data) => {
        const createdTask = await Task.createTask(data);
        if (!createdTask) {
            throw new Error(`Failed to create task`);
        }
        return createdTask;
    },
    updateTask: async (id, data) => {
        const updatedTask = await Task.updateTask(id, data);
        if (!updatedTask) {
            throw new Error(`Failed to update task with provided id: ${id}`);
        }
        return updatedTask;
    },
    deleteTask: async (id, projectId) => {
        const deletedTask = await Task.deleteTask(id, projectId);
        if (!deletedTask) {
            throw new Error(`Failed to delete task with provided id: ${id}`);
        }
        return deletedTask;
    },
    assignTask: async (id, userId) => {
        const assignedTask = Task.assignTask(id, userId);
        if (!assignedTask) {
            throw new Error(`Failed to assign task with provided id: ${id}`);
        }
        return assignedTask;
    },
    changeTaskStatus: async (id, newStatusId) => {
        const changedTaskStatus = Task.changeTaskStatus(id, newStatusId);
        if (!changedTaskStatus) {
            throw new Error(`Failed to change task status with provided id: ${id}`);
        }
    }
}

export default taskService;