import db from "../config/db_connection.js";

const Role = {
    getRoles: async () => {
        const result = await db.query(`SELECT *
                                       FROM roles`);
        return result.rows;
    },
}

export default Role;