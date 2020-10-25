import { TOGGLE_FOOTER } from '../action_types';

let defaultState = {
    showFooter: true,
};
const GlobalReducer = (state = defaultState, action) => {
    if (action.type === TOGGLE_FOOTER) {
        state = {
            ...state,
            showFooter: action.show,
        };
        return state;
    }

    return state;
};

export default GlobalReducer;
