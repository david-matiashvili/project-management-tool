const {ADMIN_ROLE, MANAGER_ROLE, DEVELOPER_ROLE} = require('./constants/roles_constants');

// Key is the class of role
export default {
    1: [ADMIN_ROLE],
    2: [ADMIN_ROLE, MANAGER_ROLE],
    3: [ADMIN_ROLE, MANAGER_ROLE, DEVELOPER_ROLE],
}