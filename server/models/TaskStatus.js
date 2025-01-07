import db from "../config/db_connection.js";
//
const TaskStatus = {
    getProjectTaskStatuses: async (projectId) => {
        const result = await db.query("SELECT id, title, color FROM task_statuses WHERE project_id = $1", [projectId]);
        return result.rows;
    },
    createTaskStatus: async (data) => {
        const result = await db.query("INSERT INTO task_statuses (title, color, project_id) VALUES ($1, $2, $3) RETURNING *;", [data.title, data.color, data.projectId]);
        return result.rows[0];
    },
    updateTaskStatus: async (id, data) => {
        const result = await db.query("UPDATE task_statuses SET title = $1, color = $2 WHERE id = $3 RETURNING *", [data.title, data.color, id]);
        return result.rows[0];
    },
    deleteTaskStatus: async (id) => {
        const result = await db.query("DELETE FROM task_statuses WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    },
}

export default TaskStatus;