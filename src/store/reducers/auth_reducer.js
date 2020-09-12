import { LOGOUT_USER, UPDATE_USER } from '../action_types';

const Auth_reducer = (state = null, action) => {
    if (action.type === UPDATE_USER) {
        let newState = action.user ? { ...action.user } : null;
        state = newState;
    }
    if (action.type === LOGOUT_USER) {
        state = null;
    }

    return state;
};

export default Auth_reducer;
