import { TOGGLE_CART, ADD_TO_CART } from '../action_types';

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
