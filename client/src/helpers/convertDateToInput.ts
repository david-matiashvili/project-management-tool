export const convertDateToInput: (dbDate: string | Date) => string = (dbDate) => {
    return new Date(dbDate).toISOString().split("T")[0];
}