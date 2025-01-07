import db from "../config/db_connection.js";

const TaskStatus = {
    getTasks: async (projectId) => {
        const result = await db.query(`SELECT tasks.id,
                                              tasks.title,
                                              tasks.body,
                                              tasks.deadline,
                                              creator.username  AS creator_name,
                                              assignee.username AS assigned_to_name,
                                              assignee.id       AS assigned_to_id,
                                              task_statuses.id  AS status_id,
                                              priority.id       AS priority_id,
                                              priority.name     AS priority_name
                                       FROM tasks
                                                JOIN users AS creator ON tasks.creator_id = creator.id
                                                JOIN users AS assignee ON tasks.assigned_to = assignee.id
                                                JOIN task_statuses ON tasks.status_id = task_statuses.id
                                                JOIN priority ON tasks.priority_id = priority.id
                                       WHERE tasks.project_id = $1
                                       GROUP BY task_statuses.id, tasks.id, creator.username, assignee.username,
                                                tasks.updated_at,
                                                priority.id, priority.name, tasks.created_at, assignee.id
                                       ORDER BY tasks.updated_at DESC`, [projectId]);
        return result.rows;
    },
    getTask: async (id, projectId) => {
        const result = await db.query(`SELECT title,
                                              body,
                                              deadline,
                                              status_id   AS "statusId",
                                              priority_id AS "priority",
                                              assigned_to AS "assignedTo",
                                              creator_id  AS "creator"
                                       FROM tasks
                                       WHERE id = $1
                                         AND project_id = $2`, [id, projectId]);
        return result.rows[0];
    },
    createTask: async (data) => {
        const result = await db.query(
            "INSERT INTO tasks (title, body, project_id, creator_id, status_id, assigned_to, deadline, priority_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
            [data.title, data.body, data.projectId, data.userId, data.statusId, data.assignedTo, data.deadline, data.priority]);
        return result.rows[0];
    },
    updateTask: async (id, data, projectId) => {
        const result = await db.query("UPDATE tasks SET title = $1, body = $2, status_id = $3, assigned_to = $4, deadline = $5, priority_id = $6 WHERE id = $7 AND project_id = $8 RETURNING *",
                                                        [data.title, data.body, data.statusId, data.assignedTo, data.deadline, data.priority, id, data.projectId]);
        return result.rows[0];
    },
    deleteTask: async (id, projectId) => {
        const result = await db.query("DELETE FROM tasks WHERE id = $1 AND project_id = $2 RETURNING *", [id, projectId]);
        return result.rows[0];
    },
    assignTask: async (id, userId) => {
        const result = await db.query("UPDATE tasks SET assigned_to = $1 WHERE id = $2", [userId, id]);
        return result.rows[0];
    },
    changeTaskStatus: async (id, newStatusId) => {
        const result = await db.query("UPDATE tasks SET status_id = $1 WHERE id = $2 RETURNING *", [newStatusId, id]);
        return result.rows[0];
    },
    changePriority: async (id, priorityId) => {
        const result = await db.query("UPDATE tasks SET priority_id = &1 WHERE id = $1 RETURNING *", [priorityId, id]);
        return result.rows[0];
    },
    changeDeadline: async (id, deadline) => {
        const result = await db.query("UPDATE tasks SET deadline = &1 WHERE id = $1 RETURNING *", [deadline, id]);
        return result.rows[0];
    }
}

export default TaskStatus;