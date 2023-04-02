export interface CartItem {
    id: number;
    name: string;
    price: number;
    location: string;
    image: string;
    avgRating: number;
    reviews: number;
    units: number;
    special_feature: string;
    start_date: number;
    end_date: number;
    rooms: Room[];
}

export interface Room {
    id: number;
    type: string;
    beds: number;
    price: number;
    adult: number;
    child: number;
    amenities: Amenity[];
}

export interface Amenity {
    id: number;
    name: string;
}

export interface Cart {
    items: CartItem[];
}

export interface RedirectInfo {
    label: string,
    path: string,
    icon?: string
}
export interface Occupancy {
    idx: number;
    label: string;
    subLabel?: string;
    value: number;
    childOptions?: string[];
    add(occupancy: Occupancy): void;
    remove(occupancy: Occupancy): void;
  }