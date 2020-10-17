import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Header from './components/Header/Header';
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
import Profile from './containers/Profile/Profile';
import PrivateRoute from './HOC/PrivateRoute/PrivateRoute';
import Auth from './HOC/Auth/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';
import Landing from './containers/Landing/Landing';
import BlockRoute from './HOC/BlockRoute/BlockRoute';
import Missing from './components/Missing/Missing';
import ResetPassword from './containers/ResetPassword/ResetPassword';
import Footer from './components/Footer/Footer';
import Helmet from 'react-helmet';
import EmailVerification from './components/EmailVerification/EmailVerification';
import Shop from './containers/Shop/Shop';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from './store/actions/cart_actions';
import Cart from './containers/Cart/Cart';
import Checkout from './containers/Checkout/Checkout';
import MyOrders from './containers/MyOrders/MyOrders';
import Product from './containers/Product/Product';
import ScrollToTop from './HOC/ScrollToTop/ScrollToTop';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

function App() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const checkDropDownCart = (e) => {
        let value = e.target;
        const checkString = (string) => {
            return !value.parentNode.className.toString().includes(string);
        };
        if (
            cart.can_show_dropDown &&
            checkString('headerOuterContainer') &&
            checkString('MuiBadge-root')
        ) {
            dispatch(toggleCart(false));
        }
    };
    return (
        <Router>
            {/*<ScrollToTop>*/}
            <Helmet>
                <title>{'ODs chocolate'}</title>
                <meta name="description" content="Nested component" />
            </Helmet>
            <div className={'appContainer'} onClick={checkDropDownCart}>
                <Auth>
                    <Header />
                    <Switch>
                        <Route exact path={'/'} component={Landing} />
                        <BlockRoute path={'/signup'} component={Signup} />
                        <BlockRoute path={'/login'} component={Login} />
                        <PrivateRoute path={'/profile'} component={Profile} />
                        <PrivateRoute
                            path={'/verifyEmail'}
                            component={EmailVerification}
                        />
                        <PrivateRoute path={'/checkout'} component={Checkout} />
                        <PrivateRoute
                            path={'/my-orders'}
                            component={MyOrders}
                        />
                        <Route
                            path={'/forgotPassword'}
                            component={ResetPassword}
                        />
                        <Route path={'/shop'} component={Shop} />
                        <Route path={'/product/:code'} component={Product} />
                        <Route path={'/cart'} component={Cart} />
                        <Route component={Missing} />
                    </Switch>
                    <Footer />
                </Auth>
            </div>
            <NotificationContainer />
            {/*</ScrollToTop>*/}
        </Router>
    );
}

export default App;
