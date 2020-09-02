import React, { useState, createRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import validator from 'validator/es';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../store/actions/loadingIndicator_actions';
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
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: {
            error_message: '',
            has_error: false,
        },
        email: {
            error_message: '',
            has_error: false,
        },
        password: {
            error_message: '',
            has_error: false,
        },
        confirmPassword: {
            error_message: '',
            has_error: false,
        },
        is_form_valid: false,
    });
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const confirmPasswordRef = createRef();
    const validateForm = () => {
        let nameHasError = !(nameRef.current.value.length >= 6);
        let emailHasError = !validator.isEmail(emailRef.current.value);
        let passwordHasError = !(passwordRef.current.value.length >= 6);
        let passwordMatchHasError = !validator.equals(
            passwordRef.current.value,
            confirmPasswordRef.current.value
        );
        let is_form_valid =
            !nameHasError &&
            !emailHasError &&
            !passwordHasError &&
            !passwordMatchHasError;
        setFormData((prevState) => {
            let prevData = { ...prevState };

            prevData.name = {
                has_error: nameHasError,
                error_message: nameHasError
                    ? 'Name must be at least 6 characters long'
                    : '',
            };
            prevData.email = {
                has_error: emailHasError,
                error_message: emailHasError
                    ? 'Wrong or Invalid email address'
                    : '',
            };
            prevData.password = {
                has_error: passwordHasError,
                error_message: passwordHasError
                    ? 'Password must be at least 6 characters long'
                    : '',
            };
            prevData.confirmPassword = {
                has_error: passwordMatchHasError,
                error_message: passwordMatchHasError
                    ? 'Password does not match'
                    : '',
            };
            prevData.is_form_valid = is_form_valid;

            return prevData;
        });

        return is_form_valid;
    };
    const submitSignUp = () => {
        if (validateForm()) {
            console.log('valid form');
            dispatch(setLoading(true));
        } else {
            console.log('invalid form');
        }
    };

    return (
        <div className={'signupContainer'}>
            <div className={'signupContainer__signupWrapper'}>
                <h1>Sign up</h1>
                <p>
                    have and account? <Link to={'/login'}>Login</Link>
                </p>
                <div className={'signupContainer__signupWrapper__HL'} />
                <form className={classes.root} noValidate autoComplete="off">
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
                        className={classes.signUp_button}
                        clickHandler={submitSignUp}
                    />
                </form>
            </div>
        </div>
    );
};

export default Signup;
