import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, path, ...rest }) => {
    const isAuth = useSelector((state) => state.user);
    return (
        <Route
            {...rest}
            render={(props) => {
                // if ((path === '/login' || path === '/signup') && isAuth) {
                //     return <Redirect to={'/'} />;
                // } else {
                return isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: props.location,
                            },
                        }}
                    />
                );
                // }
            }}
        />
    );
};
export default PrivateRoute;
