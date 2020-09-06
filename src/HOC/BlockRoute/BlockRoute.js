import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlockRoute = ({ component: Component, path, ...rest }) => {
    const isAuth = useSelector((state) => state.user);
    return (
        <Route
            {...rest}
            render={(props) => {
                return !isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
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
export default BlockRoute;
