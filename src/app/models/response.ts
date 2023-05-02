export interface APIResponse<T> {
    data: T,
    message: string,
    statusCode: number
}

export interface OptionResponse {
    label: string,
    code: string,
}
export interface ImageResponse {
    url: string;
    isThumbnail: boolean;
}
export interface SearchedHotelResponse {
    previewImages: ImageResponse[],
    hotelName: string,
    district: DistrictResponse,
    province: ProvinceResponse,
    averageRating: AverageRatingResponse,
    benefits: string[],
    discount: DiscountResponseEntity
}
export interface DiscountResponseEntity {
    name: string,
    icon: string,
}
export interface AddressResponse {

}
export interface ProvinceResponse {
    id: number,
    name: string,
    code: string,
}
export interface DistrictResponse {
    id: number,
    name: string,
    prefix: string,
}

interface AverageRatingResponse {
    name: string;
    points: number;
    reviews: number;
}
export interface AutocompleteSearchResponse{
    name: string,
    type: string,
    category: string
}