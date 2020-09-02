import { SET_LOADING } from '../action_types';

const loadingIndicatorReducer = (state = false, action) => {
    if (action.type === SET_LOADING) {
        state = action.isLoading;
    }
    return state;
};

export default loadingIndicatorReducer;
