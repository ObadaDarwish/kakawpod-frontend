import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({ component: Component, path, ...rest }) => {
    const isAuth = useSelector((state) => state.user);
    return (
        <Route
            {...rest}
            render={(props) => {
                return isAuth && isAuth.authority === 1 ? (
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
            }}
        />
    );
};

export default AdminRoute;
