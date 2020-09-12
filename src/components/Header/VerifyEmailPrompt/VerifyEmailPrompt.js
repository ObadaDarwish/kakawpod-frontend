import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import useCallServer from '../../../hooks/useCallServer';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../store/actions/loadingIndicator_actions';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';

const VerifyEmailPrompt = ({ closePrompt }) => {
    const [, , , , callServer] = useCallServer();
    const dispatch = useDispatch();
    const verifyEmail = () => {
        dispatch(setLoading(true));
        const resendVerificationEmail = callServer(
            'POST',
            `${process.env.REACT_APP_API_ENDPOINT}/user/verifyEmail`
        );
        resendVerificationEmail
            .then(() => {
                successNotification(
                    'verification email was successfully send',
                    'Email verification'
                );
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(
                        err.response.data.message,
                        'Resend verification email'
                    );
                }
            })
            .finally(() => dispatch(setLoading(false)));
    };
    return (
        <div className={'headerOuterContainer__verifyEmailPromptContainer'}>
            <h1>
                Please verify your email!...{' '}
                <span onClick={verifyEmail}>resend email</span>
            </h1>
            <IconButton onClick={closePrompt}>
                <CloseIcon fontSize={'large'} />
            </IconButton>
        </div>
    );
};

export default VerifyEmailPrompt;
