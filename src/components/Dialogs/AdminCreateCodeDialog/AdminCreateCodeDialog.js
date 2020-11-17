import React, { useRef } from 'react';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import useCallServer from '../../../hooks/useCallServer';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';

const AdminCreateCodeDialog = ({ open, close, getCreatedCodesList }) => {
    const [, , , , callServer, loading, setLoading] = useCallServer();
    const noOfCodesRef = useRef();
    const noOfUsageRef = useRef();
    const percentageRef = useRef();
    const maxDiscountRef = useRef();
    const createCodes = () => {
        setLoading(true);
        callServer(
            'POST',
            `${process.env.REACT_APP_API_ENDPOINT}/admin/codes`,
            {
                no_of_codes: parseInt(noOfCodesRef.current.value),
                no_of_usage: parseInt(noOfUsageRef.current.value),
                percentage: parseInt(percentageRef.current.value),
                max_discount: parseInt(maxDiscountRef.current.value),
            }
        )
            .then((res) => {
                getCreatedCodesList(res.data);
                successNotification(
                    'Codes has been created successfully',
                    'Codes'
                );
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Codes');
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <DialogWrapper open={open} close={close} loading={loading}>
            <form autoComplete="false" className={'createCodeWrapper'}>
                <div className={'createCodeWrapper__inputWrapper'}>
                    <InputUI label={'# codes'} reference={noOfCodesRef} />
                </div>
                <div className={'createCodeWrapper__inputWrapper'}>
                    <InputUI label={'# usage'} reference={noOfUsageRef} />
                </div>{' '}
                <div className={'createCodeWrapper__inputWrapper'}>
                    <InputUI label={'percentage'} reference={percentageRef} />
                </div>{' '}
                <div className={'createCodeWrapper__inputWrapper'}>
                    <InputUI
                        label={'max discount'}
                        reference={maxDiscountRef}
                    />
                </div>
                <div className={'createCodeWrapper__buttonWrapper'}>
                    <ButtonUI
                        name={'Create'}
                        width={'70%'}
                        clickHandler={createCodes}
                    />
                </div>
            </form>
        </DialogWrapper>
    );
};

export default AdminCreateCodeDialog;
