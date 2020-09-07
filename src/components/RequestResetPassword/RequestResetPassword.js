import React, { createRef, useState } from 'react';
import InputUI from '../UI/InputUI/InputUI';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator/es';
import useCallServer from '../../hooks/useCallServer';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        width: '100%',
    },
    login_button: {
        marginTop: '3rem',
    },
}));
const RequestResetPassword = () => {
    const classes = useStyles();
    const emailRef = createRef();
    const [, , , , callServer] = useCallServer();
    const dispatch = useDispatch();
    const [isEmailValid, setIsEmailValid] = useState({
        message: '',
        has_error: false,
    });
    const submitReset = (e) => {
        e.preventDefault();
        let isEmailValid = validator.isEmail(emailRef.current.value);
        if (isEmailValid) {
            dispatch(setLoading(true));
            const callReset = callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/auth/resetPassword`,
                { email: emailRef.current.value }
            );
            callReset
                .then(() => {
                    NotificationManager.success(
                        'Reset password email has been successfully sent, please check your inbox',
                        'Reset password',
                        3000
                    );
                })
                .catch((err) => {
                    if (err.response) {
                        NotificationManager.error(
                            err.response.data.message,
                            'Reset password',
                            3000
                        );
                    }
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            setIsEmailValid({
                message: 'Invalid email address',
                has_error: true,
            });
        }
    };
    return (
        <div className={'formContainer'}>
            <div className={'formContainer__formWrapper'}>
                <h1>Reset Password</h1>
                <div className={'formContainer__formWrapper__HL'} />
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => submitReset(e)}
                >
                    <InputUI
                        error={isEmailValid.has_error}
                        errorMessage={isEmailValid.message}
                        reference={emailRef}
                        label={'email'}
                        required={true}
                    />
                    <ButtonUI
                        name={'Reset'}
                        type={'submit'}
                        className={classes.login_button}
                    />
                </form>
            </div>
        </div>
    );
};

export default RequestResetPassword;
