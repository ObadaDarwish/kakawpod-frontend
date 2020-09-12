import React, { createRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import InputUI from '../../UI/InputUI/InputUI';
import useValidateInputs from '../../../hooks/useValidateInputs';
import { makeStyles } from '@material-ui/core/styles';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDialog-paper': {
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

const PasswordDialog = ({ onClose, open }) => {
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
            <form
                className={`formWrapper`}
                style={{ margin: '2rem' }}
                onSubmit={(e) => submitPassword(e)}
            >
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
