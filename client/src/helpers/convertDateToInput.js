export const convertDateToInput = (dbDate) => {
    return new Date(dbDate).toISOString().split("T")[0];
};
