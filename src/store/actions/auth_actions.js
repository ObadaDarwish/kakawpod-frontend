import { LOGIN_USER, LOGOUT_USER } from '../action_types';

export const login = (user) => {
    return {
        type: LOGIN_USER,
        user: user,
    };
};
export const logout = () => {
    return {
        type: LOGOUT_USER,
        user: null,
    };
};
