import roleService from '../services/role_service.js';

const roleController = {
    getRoles: async (req, res) => {
        try {
            const roles = await roleService.getRoles();
            res.status(200).json({message: "Success", data: roles});
        } catch (error) {
            res.status(400).send({message: error.message});
        }
    }
}

export default roleController;