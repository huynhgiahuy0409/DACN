export interface ProductFilterRequest{
    search: string;
    startDate: string;
    endDate: string;
    rooms: number;
    adults: number;
    children: number;
    hotelId: number
    productSortRequest?: ProductSortRequest
}
export interface ProductSortRequest{
    direction: string;
    property: string
}
