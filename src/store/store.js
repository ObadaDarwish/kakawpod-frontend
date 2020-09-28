import { createStore, combineReducers } from 'redux';
import loadingIndicatorReducer from './reducers/loadingIndicator_reducer';
import cartReducer from './reducers/cart_reducer';
import Auth_reducer from './reducers/auth_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const rootReducer = combineReducers({
    loadingIndicator: loadingIndicatorReducer,
    user: Auth_reducer,
    cart: cartReducer,
});
const store = createStore(rootReducer, composeWithDevTools());

export default store;
