export interface ProductFilterRequest{
    search: string;
    startDate: string;
    endDate: string;
    rooms: number;
    adults: number;
    children: number;
    value: number;
    type: string;
    productSort?: ProductSortRequest
    optionFilter?: OptionFilterRequest
}
export interface ProductSortRequest{
    direction: string;
    property: string
}
export interface OptionFilterRequest{
    hotelFacilities?: number[],
    benefits?: number[],
    guestRating?: string,
    discount?: string,
    priceFrom?: number,
    priceTo?: number
}
