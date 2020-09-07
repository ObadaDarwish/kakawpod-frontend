import React from 'react';
import RequestResetPassword from '../../components/RequestResetPassword/RequestResetPassword';
import ResetPasswordComponent from '../../components/ResetPassword/ResetPassword';
const queryString = require('query-string');
const ResetPassword = (props) => {
    let queryParams = queryString.parse(props.location.search);
    return queryParams.token ? (
        <ResetPasswordComponent queryParams={queryParams} />
    ) : (
        <RequestResetPassword />
    );
};

export default ResetPassword;
