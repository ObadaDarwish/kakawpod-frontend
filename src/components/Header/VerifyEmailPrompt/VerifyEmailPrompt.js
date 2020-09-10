import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import useCallServer from '../../../hooks/useCallServer';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../store/actions/loadingIndicator_actions';

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
                NotificationManager.success(
                    'verification email was successfully send',
                    'Email verification',
                    3000
                );
            })
            .catch((err) => {
                NotificationManager.error(
                    err.response.data.message,
                    'Resend verification email',
                    3000
                );
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
