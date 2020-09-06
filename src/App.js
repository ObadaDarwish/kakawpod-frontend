import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Header from './components/Header/Header';
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
import About from './components/About/About';
import Profile from './containers/Profile/Profile';
import PrivateRoute from './HOC/PrivateRoute/PrivateRoute';
import Auth from './HOC/Auth/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';
import Landing from './containers/Landing/Landing';
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});
function App() {
    return (
        <Router>
            <div className={'appContainer'}>
                <Auth>
                    <Header />
                    <Switch>
                        <Route exact path={'/'} component={Landing} />
                        <Route path={'/signup'} component={Signup} />
                        <Route path={'/login'} component={Login} />
                        <PrivateRoute path={'/profile'} component={Profile} />
                        <Route path={'/about'} component={About} />
                    </Switch>
                </Auth>
            </div>
            <NotificationContainer />
        </Router>
    );
}

export default App;
