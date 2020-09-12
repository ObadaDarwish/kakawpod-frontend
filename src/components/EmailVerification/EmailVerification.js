import React, { useEffect, useState } from 'react';
import useCallServer from '../../hooks/useCallServer';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import { updateUser } from '../../store/actions/auth_actions';
import { useHistory } from 'react-router-dom';
import { errorNotification } from '../../utils/notification-utils';
const queryString = require('query-string');
const EmailVerification = (props) => {
    const isAuth = useSelector((state) => state.user);
    let queryParams = queryString.parse(props.location.search);
    const dispatch = useDispatch();
    const history = useHistory();
    const [verificationMessage, setverificationMessage] = useState(
        'Verifying email address...'
    );
    const [, , , , callServer] = useCallServer();
    useEffect(() => {
        dispatch(setLoading(true));
        callServer(
            'PUT',
            `${process.env.REACT_APP_API_ENDPOINT}/auth/verifyEmail/${queryParams.token}`
        )
            .then(() => {
                setverificationMessage('Email has successfully been verified');
                dispatch(updateUser({ ...isAuth, email_verified: true }));
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(
                        err.response.data.message,
                        'Email verification'
                    );
                    history.push('/');
                }
            })
            .finally(() => dispatch(setLoading(false)));
    }, []);
    return (
        <div className={'emailVerificationContainer'}>
            <h1>{verificationMessage}</h1>
        </div>
    );
};

export default EmailVerification;
