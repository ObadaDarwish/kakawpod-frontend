import React, { createRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../store/actions/loadingIndicator_actions';
import useValidateInputs from '../../../hooks/useValidateInputs';
import useCallServer from '../../../hooks/useCallServer';
import { updateUser } from '../../../store/actions/auth_actions';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        width: '100%',
    },
    signUp_button: {
        marginTop: '3rem',
    },
}));

const Signup = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, validateForm] = useValidateInputs();
    const [, , , , callServer] = useCallServer();
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const confirmPasswordRef = createRef();

    const submitSignUp = (e) => {
        e.preventDefault();
        const isFormValid = validateForm(
            nameRef.current.value,
            emailRef.current.value,
            passwordRef.current.value,
            confirmPasswordRef.current.value
        );
        if (isFormValid) {
            dispatch(setLoading(true));
            const signupCall = callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/auth/signUp`,
                {
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                }
            );
            signupCall
                .then((res) => {
                    successNotification(
                        'New user has been created successfully',
                        'Sign up'
                    );
                    localStorage.setItem('token', res.data.token);
                    dispatch(updateUser(res.data.user));
                    history.push('/shop');
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Sign up');
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
                <h1>Sign up</h1>
                <p>
                    have and account? <Link to={'/login'}>Login</Link>
                </p>
                <div className={'formContainer__formWrapper__HL'} />
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => submitSignUp(e)}
                >
                    <InputUI
                        error={formData.name.has_error}
                        errorMessage={formData.name.error_message}
                        reference={nameRef}
                        label={'name'}
                        required={true}
                    />
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
                    <InputUI
                        error={formData.confirmPassword.has_error}
                        errorMessage={formData.confirmPassword.error_message}
                        reference={confirmPasswordRef}
                        label={'confirm password'}
                        type={'password'}
                        required={true}
                    />
                    <ButtonUI
                        name={'Sign up'}
                        type={'submit'}
                        className={classes.signUp_button}
                    />
                </form>
            </div>
        </div>
    );
};

export default Signup;
