import { createStore, combineReducers } from 'redux';
import loadingIndicatorReducer from './reducers/loadingIndicator_reducer';
import Auth_reducer from './reducers/auth_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const rootReducer = combineReducers({
    loadingIndicator: loadingIndicatorReducer,
    user: Auth_reducer,
});
const store = createStore(rootReducer, composeWithDevTools());

export default store;
