import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';

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

    return (
        <div className={'signupContainer'}>
            <div className={'signupContainer__signupWrapper'}>
                <h1>Sign up</h1>
                <p>
                    have and account? <Link to={'/login'}>Login</Link>
                </p>
                <form className={classes.root} noValidate autoComplete="off">
                    <InputUI label={'Name'} />
                    <InputUI label={'Address'} />
                    <InputUI label={'Password'} type={'password'} />
                    <InputUI label={'Confirm password'} type={'password'} />
                    <ButtonUI
                        name={'Sign up'}
                        className={classes.signUp_button}
                    />
                </form>
            </div>
        </div>
    );
};

export default Signup;
