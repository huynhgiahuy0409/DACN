export interface APIResponse<T> {
    data: T,
    message: string,
    statusCode: number
}

export interface OptionResponse {
    value: number,
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
    minFinalPrice: number
    maxFinalPrice: number
}
export interface ImageResponse {
    isThumbnail: boolean,
    url: string
}
export interface SearchedProductItemResponse {
    productId: number
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
    hotelImages: ImageResponse[]
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
export interface FilterOptionItemResponse {
    value: any,
    name: string,
    total: number
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
export interface FilterOptionItemResponse {
    value: any,
    name: string,
    total: number
}
export interface HotelResponse {
    id: number;
    name: string;
    description: string
    averagePoints: number
    status: string
    isFreeCancellation: boolean
    isDeals: boolean
    hotelImages: ImageResponse[]
    address: AddressResponse
    starRating: number
    averageRating: AverageRatingResponse;
    facilities: FacilityResponse[];
}
export interface RoomResponse {
    id: number;
    name: string
    maxAdults: number
    maxChildren: number
    status: string
    originPrice: number
    rentalPrice: number
    finalPrice: number
}
export interface ProductDetailResponse {
    hotel: HotelResponse
    rooms: RoomResponse[]
}
export interface FacilityResponse {
    name: string,
    icon: string
}

export interface AddToCartResponse {
    id: number;
    address: string;
    adult: number;
    bannerImage: string;
    benefits: {
        name: string; code: string;
    }[];
    child: number;
    discountPercent: number;
    fromDate: number[];
    hotel: {
        averagePoints: number; id: number;
        name: string;
        status: string;
    };
    room: {
        id: number;
        maxAdults: number;
        maxChildren: number;
        name: string;
        originPrice: number;
        rentalPrice: number;
        status: any;
    };
    roomType: string;
    sessionId: string;
    status: string;
    toDate: number[];
    totalReviews: number;
}