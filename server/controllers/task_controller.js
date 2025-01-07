import taskService from '../services/task_service.js';
import pickProperties from '../utilities/pick_properties.js';

const taskController = {
    getTasks: async (req, res) => {
        try {
            const {projectId} = req.query;
            const statuses = await taskService.getTasks(projectId);
            res.status(200).json({message: "Success", data: statuses});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    getTask: async (req, res) => {
        try {
            const {id} = req.params;
            const {projectId} = req.query;
            const taskInfo = await taskService.getTask(id, projectId);
            res.status(200).json({message: "Success", data: taskInfo});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    createTask: async (req, res) => {
        try {
            const keys = ['title', 'projectId', 'body', 'statusId', 'assignedTo', 'deadline', 'priority'];
            const data = pickProperties(req.body, keys);
            const {userId} = req.user;
            const dataWithUserId = {userId, ...data};
            const createdStatus = await taskService.createTask(dataWithUserId);
            res.status(200).json({message: 'Task created successfully.', data: createdStatus});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    updateTask: async (req, res) => {
        try {
            const keys = ['title', 'body', 'statusId', 'assignedTo', 'deadline', 'priority', 'projectId'];
            const data = pickProperties(req.body, keys);
            const {id} = req.params;
            const updatedStatus = await taskService.updateTask(id, data);
            res.status(200).json({message: 'Task updated successfully.', data: updatedStatus});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    deleteTask: async (req, res) => {
        try {
            const {id} = req.params;
            const {projectId} = req.query;
            const deletedStatus = await taskService.deleteTask(id, projectId);
            res.status(200).json({message: 'Task deleted successfully.', data: deletedStatus})
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    assignTask: async (req, res) => {
        try {
            const {id} = req.params;
            const {userId} = req.body;
            const assignedTask = await taskService.assignTask(id, userId);
            res.status(200).json({message: 'Task assigned successfully.', data: assignedTask});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    changeTaskStatus: async (req, res) => {
        try {
            const {id} = req.params;
            const {newStatusId} = req.body;
            await taskService.changeTaskStatus(id, newStatusId);
            res.status(200).json({message: 'Status changed successfully.', data: true});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

}

export default taskController;