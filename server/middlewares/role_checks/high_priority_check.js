import {ADMIN_ROLE} from '../../constants/roles_constants.js';
import getUserRoleInProject from "../../helpers/role/get_user_role_in_project.js";

const highPriorityCheck = async (req, res, next) => {
    const {status, message, role_id} = await getUserRoleInProject(req);

    if (status >= 400) {
        return res.status(status).send({message: message});
    }

    if (role_id !== ADMIN_ROLE) {
        return res.status(403).send({message: 'Permission denied!'});
    }

    next();
}
export default highPriorityCheck;