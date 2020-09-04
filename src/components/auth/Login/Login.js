import React, { createRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationManager } from 'react-notifications';
import useValidateLogin from '../../../hooks/useValidateLogin';
import { setLoading } from '../../../store/actions/loadingIndicator_actions';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/actions/auth_actions';
import useCallServer from '../../../hooks/useCallServer';
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
const Login = () => {
    const classes = useStyles();
    const emailRef = createRef();
    const passwordRef = createRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const [, , , , callServer] = useCallServer();
    const [formData, validateForm] = useValidateLogin();
    const submitLogin = () => {
        const isFormValid = validateForm(
            emailRef.current.value,
            passwordRef.current.value
        );
        if (isFormValid) {
            dispatch(setLoading(true));
            const loginCall = callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
                {
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                }
            );
            loginCall
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    dispatch(login(response.data.user));
                    history.push('/shop');
                })
                .catch((err) => {
                    if (err.response) {
                        NotificationManager.error(
                            err.response.data.message,
                            'Login',
                            3000
                        );
                    }
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        }
    };
    return (
        <div className={'formContainer'}>
            <div className={'formContainer__formWrapper'}>
                <h1>Login</h1>
                <p>
                    Don't have an account?{' '}
                    <Link to={'/signUp'}>register now</Link>
                </p>
                <div className={'formContainer__formWrapper__HL'} />
                <form className={classes.root} noValidate autoComplete="off">
                    <InputUI
                        error={formData.email.has_error}
                        errorMessage={formData.email.error_message}
                        reference={emailRef}
                        label={'email'}
                        required={true}
                    />
                    <InputUI
                        error={formData.password.has_error}
                        errorMessage={formData.password.error_message}
                        reference={passwordRef}
                        label={'password'}
                        type={'password'}
                        required={true}
                    />
                    <ButtonUI
                        name={'Login'}
                        className={classes.login_button}
                        clickHandler={submitLogin}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
