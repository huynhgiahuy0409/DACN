export const getDateInString = (dateNum: number) => {
    const date = new Date(dateNum);
    return `${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
}

export const getDateNoYearTitle = (dateNum: number) => {
    const date = new Date(dateNum);
    return `${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
}

export const getNightNumber = (startDate: number, endDate: number) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nightNumber = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return nightNumber;
}