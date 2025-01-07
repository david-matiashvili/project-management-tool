export const sortTasksWithStatuses = (tasks) => {
    const result = {};
    for (let i = 0; i < tasks.length; i++) {
        const {status_id} = tasks[i];
        if (!result[status_id]) {
            result[status_id] = [];
        }

        result[status_id].push(tasks[i]);
    }
    return result;
}