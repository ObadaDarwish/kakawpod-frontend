import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
import About from './components/About/About';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function App() {
    return (
        <Router>
            <div className={'appContainer'}>
                <Header />

                <Route path={'/signup'} component={Signup} />
                <Route path={'/login'} component={Login} />
                <Route path={'/about'} component={About} />
            </div>
            <NotificationContainer />
        </Router>
    );
}

export default App;
