import {
    TOGGLE_CART,
    ADD_TO_CART,
    UPDATE_CART,
    REMOVE_FROM_CART,
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
