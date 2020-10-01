import React, { createRef } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import { makeStyles } from '@material-ui/core/styles';
import { setLoading } from '../../../store/actions/loadingIndicator_actions';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../store/actions/auth_actions';
import useCallServer from '../../../hooks/useCallServer';
import useValidateInputs from '../../../hooks/useValidateInputs';
import { errorNotification } from '../../../utils/notification-utils';
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
    const [formData, validateForm] = useValidateInputs();
    const submitLogin = (e) => {
        e.preventDefault();
        const isFormValid = validateForm(
            null,
            emailRef.current.value,
            passwordRef.current.value,
            null
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
                    dispatch(updateUser(response.data.user));
                    history.goBack();
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Login');
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
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => submitLogin(e)}
                >
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
                    <NavLink
                        to={'/forgotPassword'}
                        className={'formContainer__formWrapper__forgotPassword'}
                    >
                        Forgot your password?
                    </NavLink>
                    <ButtonUI
                        name={'Login'}
                        type={'submit'}
                        className={classes.login_button}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
