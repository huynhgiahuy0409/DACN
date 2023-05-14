export interface ProductFilterRequest {
    search: string;
    startDate: string;
    endDate: string;
    rooms: number;
    adults: number;
    children: number;
    value: number;
    type: string;
    productSortRequest?: ProductSortRequest
}
export interface ProductSortRequest {
    direction: string;
    property: string
}
export interface SaveFavoriteHotelRequest {
    hotelId: number;
    username: string;
}