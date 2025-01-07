export const sortProjectsWithRoles = (userProjects) => {
    const result = [];
    for (let i = 0; i < userProjects.length; i++) {
        const {role_id, role_description,role_name, ...projectWithoutDescription} = userProjects[i];
        const roleIndex = result.findIndex((obj) => obj?.role_id === role_id);

        if (roleIndex === -1) {
            result.push({role_id, role_description, role_name, data: [projectWithoutDescription]});
            continue;
        }
        result[roleIndex].data.push(projectWithoutDescription);
    }

    return result;
}