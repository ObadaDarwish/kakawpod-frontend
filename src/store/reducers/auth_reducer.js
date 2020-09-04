import { LOGIN_USER } from '../action_types';

const loginReducer = (state = {}, action) => {
    if (action.type === LOGIN_USER) {
        state = action.user;
    }

    return state;
};

export default loginReducer;
