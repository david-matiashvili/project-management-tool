import db from "../config/db_connection.js";

const Project = {
    getProjectById: async (userId, projectId) => {
        const result = await db.query(`SELECT p.id          AS id,
                                              p.name        AS name,
                                              p.description AS description,
                                              p.board_name  AS board_name,
                                              up.role_id
                                       FROM user_projects up
                                                JOIN projects p ON up.project_id = p.id
                                       WHERE up.user_id = ${userId}
                                         AND up.project_id = ${projectId}`);
        return result.rows[0];
    },
    getUserProjectRole: async (userId, projectId) => {
        const result = await db.query("SELECT role_id FROM user_projects WHERE user_id = $1 AND project_id = $2", [userId, projectId]);
        return result.rows[0];
    },
    getProjects: async (ids) => {
        const placeholder = ids.map((id) => `$${id + 1}`).join(',');
        const result = await db.query(`SELECT *
                                       FROM projects
                                       WHERE id IN (${placeholder})`, ids);
        return result.rows;
    },
    getUserProjects: async (userId) => {
        const result = await db.query(`SELECT up.project_id AS id,
                                              p.name        AS name,
                                              r.id          AS role_id,
                                              r.description AS role_description,
                                              r.name        AS role_name
                                       FROM user_projects up
                                                JOIN users u ON up.user_id = u.id
                                                JOIN projects p ON up.project_id = p.id
                                                JOIN roles r ON up.role_id = r.id
                                       WHERE up.user_id = ${userId}
                                       ORDER BY r.id, up.added_at DESC`);
        return result.rows;
    },
    getProjectMembers: async (projectId) => {
        const result = await db.query(`SELECT up.user_id AS id,
                                              up.role_id AS role,
                                              u.username AS name
                                       FROM user_projects up
                                                JOIN users u ON up.user_id = u.id
                                       WHERE project_id = ${projectId}
                                       ORDER BY up.added_at DESC`);
        return result.rows;
    },
    addProjectMember: async (projectId, userId, priority) => {
        const result = await db.query("INSERT INTO user_projects(user_id, project_id, role_id) VALUES ($1, $2, $3) RETURNING *", [userId, projectId, priority]);
        return result.rows[0];
    },
    deleteProjectMember: async (projectId, userId) => {
        const result = await db.query("DELETE FROM user_projects WHERE project_id = $1 AND user_id = $2 RETURNING *", [projectId, userId]);
        return result.rows[0];
    },
    changeProjectMemberRole: async (projectId, userId, roleId) => {
        const result = await db.query(
            "UPDATE user_projects SET role_id = $1 WHERE project_id = $2 AND user_id = $3 RETURNING *",
            [roleId, projectId, userId]
        );
        return result.rows[0];
    },
    createProject: async (data) => {
        try {
            await db.query('BEGIN');

            const insertProjectQuery = `
                INSERT INTO projects (name, description, board_name)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const projectValues = [data.name, data.description, data.board_name];
            const projectResult = await db.query(insertProjectQuery, projectValues);
            const projectId = projectResult.rows[0].id;

            const insertUserProjectQuery = `
                INSERT INTO user_projects (user_id, project_id, role_id)
                VALUES ($1, $2, $3);
            `;
            const userProjectValues = [data.userId, projectId, 1]; // Create Project as admin

            await db.query(insertUserProjectQuery, userProjectValues);
            await db.query('COMMIT');
            return projectResult.rows[0];
        } catch (error) {
            await db.query('ROLLBACK');
            throw new Error(`Transaction failed: ${error.message}`);
        }
    },
    updateProject: async (id, data) => {
        const result = await db.query("UPDATE projects SET name = $1, description = $2, board_name = $3 WHERE id = $4 RETURNING *", [data.name, data.description, data.board_name, id]);
        return result.rows[0];
    },
    deleteProject: async (id) => {
        const result = await db.query("DELETE FROM projects WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    },
    deleteProjects: async (ids) => {
        const placeholders = ids.map((i) => `$${i + 1}`).join(', ');
        const result = await db.query(`DELETE
                                       FROM projects
                                       WHERE id IN (${placeholders})
                                       RETURNING *`, ids);
        return result.rows;
    }
}

export default Project;