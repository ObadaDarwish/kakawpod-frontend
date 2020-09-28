import { ADD_TO_CART, TOGGLE_CART } from '../action_types';
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
        localStorage.setItem('cart', stringfyJSON(state));
        return state;
    }
    if (action.type === ADD_TO_CART) {
        let cartItems = [...state.items];
        let isProdFound = -1;
        isProdFound = cartItems.findIndex(
            (item) => item._id === action.item._id
        );
        let newCount = 1;
        if (isProdFound >= 0) {
            newCount = cartItems[isProdFound].count + 1;
            cartItems[isProdFound].count = newCount;
        } else {
            cartItems.push({ ...action.item, count: 1 });
        }
        state = {
            ...state,
            items: cartItems,
        };
        localStorage.setItem('cart', stringfyJSON(state));
        return state;
    }
    return state;
};

export default cart_reducer;
