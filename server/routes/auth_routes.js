import express from 'express';

import userController from "../controllers/user_controller.js";
import projectController from '../controllers/project_controller.js';
import taskController from '../controllers/task_controller.js';
import taskStatusController from '../controllers/task_status_controller.js'
import roleController from '../controllers/role_controller.js';
import projectRequestController from "../controllers/project_request_controller.js";

// Validation Middlewares
import idValidation from '../middlewares/validations/get_by_id_validation.js';
import projectIdValidation from '../middlewares/validations/get_by_project_id_validation.js';
import authenticateToken from '../middlewares/authenticate_token.js';
import emailPatternValidation from '../middlewares/email_pattern_validation.js'
// Role check
import highPriorityCheck from "../middlewares/role_checks/high_priority_check.js";
import mediumPriorityCheck from "../middlewares/role_checks/medium_priority_check.js";
import lowPriorityCheck from "../middlewares/role_checks/low_priority_check.js";

const router = express.Router();
router.use(authenticateToken);

// Users
router.get('/users/:emailPattern', emailPatternValidation, highPriorityCheck, userController.searchUsersByEmail);
// Project routes
router.get('/project/:projectId', projectIdValidation, projectController.getProjectById);
router.put('/project/:projectId', projectIdValidation, highPriorityCheck, projectController.updateProject);
router.delete('/project/:projectId', projectIdValidation, highPriorityCheck, projectController.deleteProject);
router.post('/project', projectController.createProject);
// Project members
router.get('/project/members/:projectId', projectIdValidation, lowPriorityCheck, projectController.getProjectMembers);
router.post('/project/member/:projectId', projectIdValidation, highPriorityCheck, projectController.addProjectMember);
router.delete('/project/member/:projectId', projectIdValidation, highPriorityCheck, projectController.deleteProjectMember);
router.patch('/project/member/role/:projectId', projectIdValidation, highPriorityCheck, projectController.changeProjectMemberRole)
// Projects routes
router.get('/projects', projectController.getUserProjects);
// Project requests
router.get('/project_requests', projectRequestController.getUserProjectRequests);
router.post('/project_request', highPriorityCheck, projectRequestController.createProjectRequest);
router.put('/project_request', projectRequestController.acceptProjectRequest);
router.delete('/project_request', projectRequestController.declineProjectRequest);
// Roles routes
router.get('/roles', roleController.getRoles);
// Task routes
// router.get('/task/:id', idValidation, taskController.getTaskById);
router.post('/task', mediumPriorityCheck, taskController.createTask);
router.put('/task/:id', idValidation, mediumPriorityCheck, taskController.updateTask);
router.delete('/task/:id', idValidation, mediumPriorityCheck, taskController.deleteTask);
router.patch('/task/:id', idValidation, mediumPriorityCheck, taskController.assignTask);
router.patch('/task/status/:id', idValidation, lowPriorityCheck, taskController.changeTaskStatus);
router.get('/tasks', taskController.getTasks);
router.get('/task/:id', idValidation, lowPriorityCheck, taskController.getTask);

// Task Status routes
// router.get('/taskStatus/:id', idValidation, projectController.getTaskStatusById);
router.post('/task_status', mediumPriorityCheck, taskStatusController.createTaskStatus);
router.put('/task_status/:id', idValidation, mediumPriorityCheck, taskStatusController.updateTaskStatus);
router.delete('/task_status/:id', idValidation, mediumPriorityCheck, taskStatusController.deleteTaskStatus);
router.get('/task_statuses', taskStatusController.getProjectTaskStatuses);

export default router;