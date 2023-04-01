import { Amenity, Cart, Room } from "./model";

//demo
export const amenities: Amenity[] = [
    {
        id: 1,
        name: 'Wifi',
    },
    {
        id: 2,
        name: 'Bãi đậu xe',
    },
];

//demo
export const rooms: Room[] = [
    {
        id: 1,
        type: 'Phòng đơn',
        beds: 1,
        price: 1000000,
        adult: 1,
        child: 0,
        amenities: amenities
    },
    {
        id: 2,
        type: 'Phòng đôi',
        beds: 2,
        price: 2000000,
        adult: 2,
        child: 0,
        amenities: amenities
    },
]

//demo
export const cart: Cart = {
    items: [
        {
            id: 1,
            name: 'Product 1',
            price: 1000000,
            location: 'Location 1',
            image: 'https://pix8.agoda.net/hotelImages/2279980/-1/08635f845557c87d704ed9cf15c583d1.jpg?ca=7&ce=1&s=828x464&ar=16x9',
            avgRating: 10.0,
            reviews: 100,
            units: 1,
            special_feature: 'Special Feature 1',
            start_date: 1680102315647,
            end_date: 1680170095140,
            rooms: rooms
        },
        {
            id: 2,
            name: 'Product 2',
            price: 2000000,
            location: 'Location 2',
            image: 'https://pix8.agoda.net/hotelImages/2279980/-1/08635f845557c87d704ed9cf15c583d1.jpg?ca=7&ce=1&s=828x464&ar=16x9',
            avgRating: 9.5,
            reviews: 200,
            units: 2,
            special_feature: 'Special Feature 2',
            start_date: 1680102315647,
            end_date: 1680170095140,
            rooms: rooms
        },
    ]
};
