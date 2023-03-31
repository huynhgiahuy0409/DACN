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
}

export interface Cart {
    items: CartItem[];
}
export interface RedirectInfo {
    label: string,
    path: string,
    icon?: string
}