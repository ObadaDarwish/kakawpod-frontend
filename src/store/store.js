import { createStore, combineReducers } from 'redux';
import loadingIndicatorReducer from './reducers/loadingIndicator_reduxer';

const rootReducer = combineReducers({
    loadingIndicator: loadingIndicatorReducer,
});
const store = createStore(rootReducer);

export default store;
