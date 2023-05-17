export interface ProductFilterRequest{
    search: string;
    startDate: string;
    endDate: string;
    rooms: number;
    adults: number;
    children: number;
    value: number;
    type: string;
    productSortRequest?: ProductSort
    optionFilter?: OptionFilter
}
export interface ProductSort{
    direction: string;
    property: string
}
export interface OptionFilter{
    hotelFacilities?: number[],
    benefits?: number[],
    guestRating?: string,
    discount?: string,
    priceFrom?: number,
    priceTo?: number
}
