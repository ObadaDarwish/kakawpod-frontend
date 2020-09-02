import { SET_LOADING } from '../action_types';

export const setLoading = (isLoading) => {
    return { type: SET_LOADING, isLoading: isLoading };
};
