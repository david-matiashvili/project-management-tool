import taskStatusService from '../services/task_status_service.js';
import pickProperties from '../utilities/pick_properties.js';

const taskStatusController = {
    getProjectTaskStatuses: async (req, res) => {
        try {
            const {projectId} = req.query;
            const statuses = await taskStatusService.getProjectTaskStatuses(projectId);
            res.status(200).json({message: "Success", data: statuses});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    createTaskStatus: async (req, res) => {
        try {
            const keys = ['title', 'color', 'projectId'];
            const data = pickProperties(req.body, keys);
            const createdStatus = await taskStatusService.createTaskStatus(data);
            res.status(200).json({message: 'Status created successfully.', data: createdStatus});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    updateTaskStatus: async (req, res) => {
        try {
            const keys = ['title', 'color'];
            const data = pickProperties(req.body, keys);
            const {id} = req.params;
            const updatedStatus = await taskStatusService.updateTaskStatus(id, data);
            res.status(200).json({message: 'Status updated successfully.', data: updatedStatus});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
    deleteTaskStatus: async (req, res) => {
        try {
            const {id} = req.params;
            const deletedStatus = await taskStatusService.deleteTaskStatus(id);
            res.status(200).json({message: 'Status deleted successfully.', data: deletedStatus})
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },
}

export default taskStatusController;