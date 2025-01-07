import Role from "../models/Role.js";

const roleService = {
    getRoles: async () => {
        const roles = await Role.getRoles();
        if (!roles) {
            throw new Error("Failed to get a roles");
        }
        return roles;
    }
}

export default roleService;