import React, { useRef, useState } from 'react';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import useCallServer from '../../../hooks/useCallServer';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';

const POSDiscountDialog = ({ open, close, applyDiscountHandler }) => {
    const discountRef = useRef();
    const OTPReference = useRef();
    const [stage, setStage] = useState('requestOTP');
    const [, , , , callServer, loading, setLoading] = useCallServer();
    const requestOTP = () => {
        setLoading(true);
        callServer('POST', `${process.env.REACT_APP_API_ENDPOINT}/admin/OTP`, {
            percentage: discountRef.current.value,
        })
            .then(() => {
                setStage('applyDiscount');
                successNotification(
                    'OTP has been send successfully',
                    'Discount'
                );
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Code');
                }
            })
            .finally(() => setLoading(false));
    };
    const applyDiscount = () => {
        if (OTPReference.current.value && discountRef.current.value) {
            setLoading(true);
            callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/admin/validateOTP/${OTPReference.current.value}`
            )
                .then(() => {
                    applyDiscountHandler(
                        discountRef.current.value,
                        OTPReference.current.value
                    );
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Code');
                    }
                })
                .finally(() => setLoading(false));
        }
    };
    const handleClosingDialog = () => {
        close();
    };
    const resetDiscountState = () => {
        setStage('requestOTP');
    };
    return (
        <DialogWrapper
            open={open}
            onClose={resetDiscountState}
            close={handleClosingDialog}
            loading={loading}
        >
            <form className={'discountFormContainer'}>
                <InputUI
                    label={'Discount percentage'}
                    reference={discountRef}
                    defaultValue={0}
                    autofocus
                    type={'number'}
                />
                {stage === 'applyDiscount' && (
                    <InputUI
                        label={'OTP'}
                        reference={OTPReference}
                        type={'number'}
                    />
                )}
                {stage === 'requestOTP' ? (
                    <ButtonUI name={'request OTP'} clickHandler={requestOTP} />
                ) : (
                    <ButtonUI name={'Apply'} clickHandler={applyDiscount} />
                )}
            </form>
        </DialogWrapper>
    );
};

export default POSDiscountDialog;
