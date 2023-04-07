export interface OptionResponse{
    label: string,
    code: string,
}
export interface ImageResponse{
    url: string;
    isThumbnail: boolean;
}
export interface SearchedHotelResponse {
    hotelName: string;

}
export interface AddressResponse{

}
export interface ProvinceResponse{
    id: number,
    name: string,
    code: string,
}
export interface DistrictResponse{
    id: number
    name: string,
    code: string
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
//   interface AverageRating {
//     name: string;
//     points: number;
//     reviews: number;
//   }
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

