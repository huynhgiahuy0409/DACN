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
export interface SearchedProductResponse {
    searchedProduct: SearchedProductItemResponse
    relativeSearchedProducts: SearchedProductItemResponse[]
}
export interface SearchedProductItemResponse {
    name: string;
    benefits: string[];
    address: AddressResponse;
    starRating: number;
    originalPrice: number;
    rentalPrice: number;
    finalPrice: number;
    averageRating: AverageRatingResponse;
    discount: DiscountResponse;
    isSearchedHotel: boolean;
    isDeals: boolean;
    isOnlinePayment: boolean;
    isFreeCancellation: boolean;
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

export interface AverageRatingResponse {
    name: string;
    points: number;
    reviews: number;
}
export interface AutocompleteSearchResponse {
    name: string,
    category: string,
    value: string,
    type: string,
}
export interface AddressResponse {
    id: number,
    street: string
    province: string,
    district: string,
    ward: string
}
export interface DiscountResponse {
    name: string,
    percent: number
}
export interface FavoriteHotelResponse {
    id: number;
    hotelId: number;
    bannerUrl: string;
    name: string;
    address: string;
    avgRating: number;
    totalRating: number;
    originPrice: number;
    finalPrice: number;
}