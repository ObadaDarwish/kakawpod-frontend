import {
    TOGGLE_CART,
    ADD_TO_CART,
    UPDATE_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    OUT_OF_STOCK,
} from '../action_types';

export const toggleCart = () => {
    return {
        type: TOGGLE_CART,
    };
};
export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        item: item,
    };
};
export const updateCart = (item) => {
    return {
        type: UPDATE_CART,
        item: item,
    };
};
export const removeFromCart = (item) => {
    return {
        type: REMOVE_FROM_CART,
        item: item,
    };
};
export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};
export const outOfStock = (items) => {
    return {
        type: OUT_OF_STOCK,
        items: items,
    };
};
