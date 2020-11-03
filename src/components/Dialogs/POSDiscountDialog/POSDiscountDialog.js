import React, { useRef, useState } from 'react';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import useCallServer from '../../../hooks/useCallServer';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';

const POSDiscountDialog = ({ onClose, open, close, applyDiscountHandler }) => {
    const discountRef = useRef();
    const OTPReference = useRef();
    const [stage, setStage] = useState('applyDiscount');
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [, , , , callServer, loading, setLoading] = useCallServer();
    const changeDiscount = (e) => {
        const { value } = e.target;
        if (value > 15) {
            setStage('requestOTP');
        } else {
            setStage('applyDiscount');
        }
    };
    const requestOTP = () => {
        setLoading(true);
        callServer(
            'POST',
            `${process.env.REACT_APP_API_ENDPOINT}/admin/pos/discountOTP`,
            {
                percentage: discountRef.current.value,
            }
        )
            .then(() => {
                setShowOTPInput(true);
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
        if (discountRef.current.value > 15) {
            setLoading(true);
            callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/admin/pos/OTP/${OTPReference.current.value}`
            )
                .then(() => {
                    applyDiscountHandler(
                        discountRef.current.value,
                        OTPReference.current.value
                    );
                    setShowOTPInput(false);
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Code');
                    }
                })
                .finally(() => setLoading(false));
        } else {
            applyDiscountHandler(discountRef.current.value, null);
        }
    };
    const handleClosingDialog = () => {
        setStage('applyDiscount');
        setShowOTPInput(false);
        close();
    };
    return (
        <DialogWrapper
            open={open}
            onClose={onClose}
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
                    changeHandler={changeDiscount}
                />
                {showOTPInput && (
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
