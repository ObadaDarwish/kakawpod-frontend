import {
    ADD_TO_CART,
    CLEAR_CART,
    REMOVE_FROM_CART,
    TOGGLE_CART,
    UPDATE_CART,
    OUT_OF_STOCK,
} from '../action_types';
import { parseJSON, stringfyJSON } from '../../utils/jsonConversion';

let defaultState = {
    items: [],
    can_show_dropDown: false,
};
const cart_reducer = (
    state = parseJSON(localStorage.getItem('cart')) || defaultState,
    action
) => {
    if (action.type === TOGGLE_CART) {
        state = {
            ...state,
            can_show_dropDown: !state.can_show_dropDown,
        };
        return state;
    }
    if (action.type === ADD_TO_CART) {
        let cartItems = [...state.items];
        let isProdFound = -1;
        isProdFound = cartItems.findIndex(
            (item) => item._id === action.item._id
        );
        let newCount = 1;
        if (
            isProdFound >= 0 &&
            action.item.category !== 'mixBox' &&
            action.item.category !== 'luxuryBox'
        ) {
            newCount = cartItems[isProdFound].count + action.item.count;
            cartItems[isProdFound].count = newCount;
        } else {
            cartItems.unshift({ ...action.item });
        }
        state = {
            ...state,
            items: cartItems,
        };
        localStorage.setItem('cart', stringfyJSON(state));
        return state;
    }
    if (action.type === UPDATE_CART) {
        let currentCart = [...state.items];
        let itemIndex = currentCart.findIndex(
            (item) => item._id === action.item._id
        );
        currentCart.splice(itemIndex, 1, action.item);
        state = {
            ...state,
            items: currentCart,
        };
        localStorage.setItem('cart', stringfyJSON(state));
        return state;
    }
    if (action.type === REMOVE_FROM_CART) {
        let currentItems = [...state.items];
        let itemIndex = currentItems.findIndex(
            (item) => item._id === action.item._id
        );
        currentItems.splice(itemIndex, 1);
        state = {
            ...state,
            items: currentItems,
        };
        localStorage.setItem('cart', stringfyJSON(state));
        return state;
    }
    if (action.type === CLEAR_CART) {
        state = {
            ...state,
            items: [],
        };
        localStorage.setItem('cart', stringfyJSON(state));
        return state;
    }
    if (action.type === OUT_OF_STOCK) {
        let currentItems = [...state.items];
        action.items.forEach((product) => {
            let itemIndex = currentItems.findIndex(
                (item) => item._id === product._id
            );
            if (itemIndex >= 0) {
                currentItems[itemIndex].outOfStock = true;
            }
        });
        state = {
            ...state,
            items: currentItems,
        };
        localStorage.setItem('cart', stringfyJSON(state));
        return state;
    }
    return state;
};

export default cart_reducer;
