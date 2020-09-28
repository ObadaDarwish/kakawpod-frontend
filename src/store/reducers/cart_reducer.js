import { TOGGLE_CART } from '../action_types';

let defaultState = {
    items: [],
    can_show_dropDown: false,
};
const cart_reducer = (state = defaultState, action) => {
    if (action.type === TOGGLE_CART) {
        state = {
            ...state,
            can_show_dropDown: !state.can_show_dropDown,
        };
        return state;
    }

    return state;
};

export default cart_reducer;
