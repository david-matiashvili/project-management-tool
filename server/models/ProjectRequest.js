import db from "../config/db_connection.js";


const ProjectRequest = {
    getUserProjectRequests: async (email) => {
        const result = await db.query(`
            SELECT pr.id,
                   pr.role_id    AS "roleId",
                   r.name        AS "roleName",
                   pr.project_id AS "projectId",
                   p.name        AS "projectName",
                   u.username    AS "sender",
                   u.id          AS "senderId"
            FROM project_requests pr
                     JOIN projects p ON pr.project_id = p.id
                     JOIN roles r ON pr.role_id = r.id
                     JOIN users u ON pr.request_user_id = u.id
            WHERE pr.user_email = $1
        `, [email]);

        // {
        //     id: request.id,
        //     sender: req.user.username,
        //     senderId: req.user.userId,
        //     projectName: projectInfo.name,
        //     projectId: projectInfo.id,
        //     roleName: roleInfo.name,
        //     roleId: roleInfo.id
        // }
        return result.rows;
    },
    createProjectRequest: async (data) => {
        const result = await db.query(
            "INSERT INTO project_requests (user_email, project_id, role_id, request_user_id) VALUES ($1,$2,$3,$4) RETURNING *",
            [data.email, data.projectId, data.role, data.requestUserId]
        );

        return result.rows[0];
    },
    acceptProjectRequest: async (request) => {
        const addUserQuery = `INSERT INTO user_projects (user_id, project_id, role_id)
                              VALUES ($1, $2, $3) RETURNING *`;
        const deleteRequestQuery = `DELETE
                                    FROM project_requests
                                    WHERE user_email = $1
                                      AND project_id = $2`;

        const addUserData = [request.userId, request.project_id, request.role_id];
        const deleteRequestData = [request.user_email, request.project_id];

        try {
            await db.query('BEGIN');
            const result = await db.query(addUserQuery, addUserData);
            await db.query(deleteRequestQuery, deleteRequestData);
            await db.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await db.query('ROLLBACK');
            throw new Error(`Transaction failed: ${error.message}`);
        }
    },
    declineProjectRequest: async (email, projectId) => {
        const result = await db.query(`DELETE
                                       FROM project_requests
                                       WHERE user_email = $1
                                         AND project_id = $2 RETURNING *`, [email, projectId]);
        return result.rows[0];
    },
    getRequest: async (email, projectId) => {
        const result = await db.query(`SELECT *
                                       FROM project_requests
                                       WHERE user_email = $1
                                         AND project_id = $2
                                       LIMIT 1`,
            [email, projectId]);

        return result.rows[0];
    }
}

export default ProjectRequest;
