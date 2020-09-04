import { LOGIN_USER } from '../action_types';

export const login = (user) => {
    return {
        type: LOGIN_USER,
        user: user,
    };
};
