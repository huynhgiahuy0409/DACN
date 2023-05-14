export const API_PREFIX = "/api";

export const GET_CART_BY_SESSION_ID = `${API_PREFIX}/carts/getCartBySessionId`;
export const DELETE_ITEM_FROM_CART = `${API_PREFIX}/carts/deleteItemFromCart`;
export const DELETE_BY_IDS = `${API_PREFIX}/carts/deleteByIds`;

export const ADD_RESERVATION = `${API_PREFIX}/reservations/saveReservation`;
export const ADD_ALL_RESERVATION = `${API_PREFIX}/reservations/saveAllReservation`;

export const SAVE_FAVORITE_HOTEL = `${API_PREFIX}/favorites/save`;
export const FIND_ALL_FAVORITE_HOTEL = `${API_PREFIX}/favorites/findAllByUsername`;
export const DELETE_FAVORITE_HOTEL_BY_ID = `${API_PREFIX}/favorites/deleteById`;

export const URL_API = "http://localhost:8080";
export const ONE_DOLLAR_IN_USD = 23456;
