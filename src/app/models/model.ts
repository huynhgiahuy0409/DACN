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

export interface PaypalToken {
    access_token: string;
    app_id: string;
    expires_in: number;
    nonce: string;
    scope: string;
    token_type: string;
}

export interface PaymentLink {
    href: string;
    method: string;
    rel: string;
}

export interface PaymentTransaction {
    amount: { total: string, currency: string };
    related_resources: { sale: { id: string, state: string } }[];
}

export interface PaymentResponse {
    create_time: string;
    id: string;
    intent: string;
    links: PaymentLink[];
    payer: { payment_method: string };
    state: string;
    transactions: PaymentTransaction[];
}

export interface PaymentResultResponse {
    cart: string;
    create_time: string;
    intent: string;
    links: PaymentLink[];
    status: string;
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