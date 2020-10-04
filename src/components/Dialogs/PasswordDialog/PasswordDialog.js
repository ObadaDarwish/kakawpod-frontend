import React, { createRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import InputUI from '../../UI/InputUI/InputUI';
import useValidateInputs from '../../../hooks/useValidateInputs';
import { makeStyles } from '@material-ui/core/styles';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDialog-paper': {
            display: 'flex',
            flexDirection: 'column',
            background: '#F1D1D1',
            minWidth: '50rem',
            [theme.breakpoints.down('sm')]: {
                minWidth: '90%',
            },
        },
        '& .MuiButton-root': {
            marginTop: '2rem',
        },
    },
}));

const PasswordDialog = ({ onClose, open, close }) => {
    const classes = useStyles();
    const passwordRef = createRef();
    const [formData, validateForm] = useValidateInputs();

    const submitPassword = (e) => {
        e.preventDefault();
        let passwordValue = passwordRef.current.value;
        if (validateForm(null, null, passwordValue, null)) {
            onClose(passwordValue);
        }
    };
    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            className={classes.root}
        >
            <IconButton
                onClick={close}
                style={{
                    alignSelf: 'flex-end',
                    margin: '1rem',
                    outline: 'none',
                }}
            >
                <CloseIcon fontSize={'large'} />
            </IconButton>
            <form
                className={`formWrapper`}
                style={{ margin: '0 2rem', marginBottom: '2rem' }}
                onSubmit={(e) => submitPassword(e)}
            >
                <h1>Please insert your password</h1>
                <InputUI
                    error={formData.password.has_error}
                    errorMessage={formData.password.error_message}
                    reference={passwordRef}
                    label={'password'}
                    type={'password'}
                    required={true}
                />
                <ButtonUI name={'Submit'} type={'submit'} />
            </form>
        </Dialog>
    );
};

export default PasswordDialog;
