import React, { createRef, useEffect, useState } from 'react';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import useCallServer from '../../../hooks/useCallServer';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';
import CircularLoadingIndicator from '../../LoadingIndicator/CircularLoadingIndicator';
import DialogWrapper from '../DialogWrapper/DialogWrapper';

const VerifyPhoneDialog = ({ open, phone, onClose, close }) => {
    const confirmInputRef = createRef();
    const phoneRef = createRef();
    const [, , , , callServer, loadingCode, setLoadingCode] = useCallServer();
    const [phoneValue, setPhoneValue] = useState();
    const [inputData, setInputData] = useState({
        error_message: '',
        has_error: false,
    });

    const sendCode = (phoneNumber) => {
        setLoadingCode(true);
        return callServer(
            'POST',
            `${process.env.REACT_APP_API_ENDPOINT}/user/requestVerifyPhone`,
            {
                phone: phoneNumber,
            }
        );
    };
    useEffect(() => {
        setPhoneValue(phone);
    }, [phone]);
    useEffect(() => {
        if (open && phoneValue) {
            sendCode(phoneValue)
                .then(() => {})
                .catch((err) => {
                    if (err.response) {
                        close();
                        errorNotification(err.response.data.message, 'Code');
                    }
                })
                .finally(() => setLoadingCode(false));
        }
    }, [open, phoneValue]);
    const confirm = (e) => {
        e.preventDefault();
        if (phoneValue) {
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
                            errorNotification(
                                err.response.data.message,
                                'Code'
                            );
                        }
                    })
                    .finally(() => setLoadingCode(false));
            } else {
                setInputData({
                    has_error: true,
                    error_message: 'code has to be 6 digits long',
                });
            }
        } else {
            requestCode();
        }
    };
    const resendCode = () => {
        sendCode(phoneValue)
            .then(() => {})
            .catch((err) => {
                if (err.response) {
                    close();
                    errorNotification(err.response.data.message, 'Code');
                }
            })
            .finally(() => setLoadingCode(false));
    };
    const requestCode = () => {
        let { value } = phoneRef.current;
        sendCode(value)
            .then(() => {
                setPhoneValue(value);
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Code');
                }
            })
            .finally(() => {
                setLoadingCode(false);
            });
    };
    const codeTemplate = (
        <>
            <h1>
                please check your phone for the 6 digits verification code,
                <span onClick={resendCode} className={'resendCode'}>
                    resend code
                </span>
                .
            </h1>
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
        </>
    );
    const phoneTemplate = (
        <>
            <h1>please add your phone to place order</h1>
            <InputUI label={'phone'} reference={phoneRef} required={true} />
            <ButtonUI
                name={'Request Code'}
                type={'submit'}
                is_disabled={loadingCode}
            />
        </>
    );
    return (
        <DialogWrapper
            open={open}
            onClose={onClose}
            maxWidth={'60rem'}
            close={close}
        >
            <form
                className={`formWrapper`}
                style={{ margin: '2rem', marginTop: 0 }}
                onSubmit={(e) => confirm(e)}
            >
                {loadingCode ? (
                    <CircularLoadingIndicator height={'5rem'} />
                ) : phoneValue ? (
                    codeTemplate
                ) : (
                    phoneTemplate
                )}
            </form>
        </DialogWrapper>
    );
};

export default VerifyPhoneDialog;
