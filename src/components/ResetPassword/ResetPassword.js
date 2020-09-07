import React, { createRef, useState } from 'react';
import InputUI from '../UI/InputUI/InputUI';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import { NotificationManager } from 'react-notifications';
import useCallServer from '../../hooks/useCallServer';
import { useDispatch } from 'react-redux';
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
const ResetPassword = ({ queryParams }) => {
    const classes = useStyles();
    const history = useHistory();
    const passwordRef = createRef();
    const [, , , , callServer] = useCallServer();
    const dispatch = useDispatch();
    const [isPasswordValid, setIsPasswordValid] = useState({
        message: '',
        has_error: false,
    });
    const submitReset = (e) => {
        e.preventDefault();
        let isPasswordValid = passwordRef.current.value.length >= 6;
        if (isPasswordValid) {
            dispatch(setLoading(true));
            const callReset = callServer(
                'PUT',
                `${process.env.REACT_APP_API_ENDPOINT}/auth/resetPassword`,
                {
                    resetToken: queryParams.token,
                    newPassword: passwordRef.current.value,
                }
            );
            callReset
                .then(() => {
                    NotificationManager.success(
                        'Password has been updated successfully',
                        'Reset password',
                        3000
                    );
                    history.push('/login');
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
            setIsPasswordValid({
                message: 'Password must be at least 6 characters long',
                has_error: true,
            });
        }
    };
    return (
        <div className={'formContainer'}>
            <div className={'formContainer__formWrapper'}>
                <h1>New password</h1>
                <div className={'formContainer__formWrapper__HL'} />
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => submitReset(e)}
                >
                    <InputUI
                        error={isPasswordValid.has_error}
                        errorMessage={isPasswordValid.message}
                        reference={passwordRef}
                        label={'password'}
                        type={'password'}
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

export default ResetPassword;
