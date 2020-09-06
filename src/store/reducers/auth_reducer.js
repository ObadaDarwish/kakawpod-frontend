import { LOGIN_USER, LOGOUT_USER } from '../action_types';

const loginReducer = (state = null, action) => {
    if (action.type === LOGIN_USER) {
        state = action.user;
    }
    if (action.type === LOGOUT_USER) {
        state = null;
    }

    return state;
};

export default loginReducer;
