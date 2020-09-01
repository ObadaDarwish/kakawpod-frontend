import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
import About from './components/About/About';
function App() {
    return (
        <div className={'appContainer'}>
            <Header />

            <Route path={'/signup'} component={Signup} />
            <Route path={'/login'} component={Login} />
            <Route path={'/about'} component={About} />
        </div>
    );
}

export default App;
