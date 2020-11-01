import React, { createRef, useState } from 'react';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import DialogWrapper from '../DialogWrapper/DialogWrapper';

const ConfirmDialog = ({ open, checkText, onClose, close }) => {
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
                <h1>Please confirm by typing '{checkText}'.</h1>
                <InputUI
                    error={inputData.has_error}
                    errorMessage={inputData.error_message}
                    reference={confirmInputRef}
                    required={true}
                />
                <ButtonUI name={checkText} type={'submit'} />
            </form>
        </DialogWrapper>
    );
};

export default ConfirmDialog;
