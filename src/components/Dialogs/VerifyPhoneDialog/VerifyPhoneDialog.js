import React, { createRef, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import InputUI from '../../UI/InputUI/InputUI';
import { makeStyles } from '@material-ui/core/styles';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useCallServer from '../../../hooks/useCallServer';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';
import CircularLoadingIndicator from '../../LoadingIndicator/CircularLoadingIndicator';

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

const VerifyPhoneDialog = ({ open, phone, onClose, close }) => {
    const classes = useStyles();
    const confirmInputRef = createRef();
    const [, , , , callServer, loadingCode, setLoadingCode] = useCallServer();
    const [inputData, setInputData] = useState({
        error_message: '',
        has_error: false,
    });
    useEffect(() => {
        const sendCode = () => {
            setLoadingCode(true);
            callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/user/requestVerifyPhone`,
                {
                    phone: phone,
                }
            )
                .then(() => {})
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Code');
                    }
                })
                .finally(() => setLoadingCode(false));
        };
        if (open) {
            sendCode();
        }
    }, [open]);
    const confirm = (e) => {
        e.preventDefault();
        if (confirmInputRef.current.value.length <= 6) {
            setLoadingCode(true);
            callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/user/verifyPhone`,
                {
                    code: confirmInputRef.current.value,
                }
            )
                .then(() => {
                    onClose();
                    successNotification('phone verified.', 'Phone');
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Code');
                    }
                })
                .finally(() => setLoadingCode(false));
        } else {
            setInputData({
                has_error: true,
                error_message: 'code has to be 6 digits long',
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
                style={{ margin: '2rem', marginTop: 0 }}
                onSubmit={(e) => confirm(e)}
            >
                {loadingCode ? (
                    <CircularLoadingIndicator height={'5rem'} />
                ) : (
                    <h1>
                        please check your phone for the 6 digits verification
                        code,
                        <span>resend code</span>.
                    </h1>
                )}

                <InputUI
                    error={inputData.has_error}
                    errorMessage={inputData.error_message}
                    label={'Code'}
                    reference={confirmInputRef}
                    required={true}
                />
                <ButtonUI
                    name={'Verify'}
                    type={'submit'}
                    is_disabled={loadingCode}
                />
            </form>
        </Dialog>
    );
};

export default VerifyPhoneDialog;
