export interface OptionResponse{
    label: string,
    code: string,
}
export interface ImageResponse{
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
export interface DiscountResponseEntity{
    name: string,
    icon: string,
}
export interface AddressResponse{

}
export interface ProvinceResponse{
    id: number,
    name: string,
    code: string,
}
export interface DistrictResponse{
    id: number,
    name: string,
    prefix: string,
}


// export interface Product {
//     name: string;
//     address: string;
//     benefits: string[];
//     startRating: number;
//     originalPrice: number;
//     rentalPrice: number;
//     averageRating: AverageRating;
//     reviewImages: Image[];
//     topBadges: TopBadge[];
//     propertyCards: PropertyCard[]
//   }
//   export interface SearchedHotelResponse {
//   }
  interface AverageRatingResponse {
    name: string;
    points: number;
    reviews: number;
  }
//   interface TopBadge {
//     name: string;
//     icon: string
//   }
//   interface PropertyCard {
//     name: string;
//     icon: string
//   }
//   interface Image {
//     url: string;
//     isThumbnail: boolean;
//   }

