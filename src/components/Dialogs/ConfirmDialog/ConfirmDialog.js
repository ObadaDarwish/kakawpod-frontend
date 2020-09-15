import React, { createRef, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import InputUI from '../../UI/InputUI/InputUI';
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

const ConfirmDialog = ({ open, checkText, onClose, close }) => {
    const classes = useStyles();
    const confirmInputRef = createRef();
    const [inputData, setInputData] = useState({
        error_message: '',
        has_error: false,
    });
    const confirm = (e) => {
        e.preventDefault();
        if (confirmInputRef.current.value.toString() === checkText.toString()) {
            onClose();
        } else {
            setInputData({
                has_error: true,
                error_message: `Sorry mate! '${confirmInputRef.current.value}' does not match '${checkText}'!!`,
            });
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
                style={{ margin: '2rem' }}
                onSubmit={(e) => confirm(e)}
            >
                <h1>Please type '{checkText}'.</h1>
                <InputUI
                    error={inputData.has_error}
                    errorMessage={inputData.error_message}
                    reference={confirmInputRef}
                    required={true}
                />
                <ButtonUI name={checkText} type={'submit'} />
            </form>
        </Dialog>
    );
};

export default ConfirmDialog;
