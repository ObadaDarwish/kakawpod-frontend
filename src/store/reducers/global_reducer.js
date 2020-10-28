import { TOGGLE_FOOTER, TOGGLE_LOGO } from '../action_types';

let defaultState = {
    showFooter: true,
    showLogo: true,
};
const GlobalReducer = (state = defaultState, action) => {
    if (action.type === TOGGLE_FOOTER) {
        state = {
            ...state,
            showFooter: action.show,
        };
        return state;
    }
    if (action.type === TOGGLE_LOGO) {
        state = {
            ...state,
            showLogo: action.show,
        };
        return state;
    }

    return state;
};

export default GlobalReducer;
