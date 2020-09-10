import { LOGOUT_USER, UPDATE_USER } from '../action_types';

export const logout = () => {
    return {
        type: LOGOUT_USER,
        user: null,
    };
};
export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user: user,
    };
};
