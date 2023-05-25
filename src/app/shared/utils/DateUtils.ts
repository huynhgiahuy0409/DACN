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

export const getDateFromArray = (arr: number[]) => {
    return arr[0] + "-" + (arr[1] > 10 ? arr[1] : "0" + arr[1]) + "-" + (arr[2] > 10 ? arr[2] : "0" + arr[2]);
}
export const getDateFromArrayInFormat = (arr: number[]) => {
    return (arr[2] > 10 ? arr[2] : "0" + arr[2]) + "/" + (arr[1] > 10 ? arr[1] : "0" + arr[1]) + "/" + arr[0];
}