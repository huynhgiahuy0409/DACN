export interface CartItem {
  id: number;
  adult: number;
  child: number;
  fromDate: string;
  toDate: string;
  hotel: HotelResponse;
  room: RoomResponse;
  sessionId: string;
  address: string;
  bannerImage: string;
  totalReviews: number;
}

export interface HotelResponse {
  id: number;
  name: string;
  description: string;
  averagePoints: number;
  status: string;
}

export interface RoomResponse {
  id: number;
  name: string;
  maxAdults: number;
  maxChildren: number;
  status: string;
  originPrice: number;
  rentalPrice: number;
}

export interface ApiResponse {
  data: string;
  message: string;
  statusCode: number
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

export interface Basic {

  typeComparisionBusiness: string;
  numComparisionBusiness: number;
  numAccommodations: number;
  numBathroom: number;
  numBedroom: number;
  numRoomOne: number;
  typeRoomOne: string;
  numCommon: number;
  typeCommon: string;
}

export interface Location {

  address: string;
  house: string;
  country: string;
  city: string;
}

export interface Description {
  nameHouse: string;
  descHouse: string;
  suggest: string;
  rule: string;
  move: string;
  star: number;
}

export interface Amenities {
  recomendation: string[];
}

export interface MySelf {
  firstName: string;
  lastName: string;
  date: string;
}

export interface Company {
  nameCompany: string;


  addressCompany: string;


  codeAreaCompany: string;
}

export interface Photos {
  file: string;
  fileSource: string[];
}

export interface Pricing {
  managerChannel: string;
  payment: string;
  price: number;
}

export interface Profile {
  typeHost: string;
  company: Company;
  mySelf: MySelf;
}

export interface HotelProfile {
  id: number;
  basic: Basic;
  location: Location;
  description: Description;
  amenities: Amenities;
  pricing: Pricing;
  photos: Photos;
  profile: Profile;
}
