import React, { createRef } from 'react';
import InputUI from '../../UI/InputUI/InputUI';
import useValidateInputs from '../../../hooks/useValidateInputs';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import DialogWrapper from '../DialogWrapper/DialogWrapper';

const PasswordDialog = ({ onClose, open, close }) => {
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
        <DialogWrapper
            open={open}
            onClose={onClose}
            maxWidth={'60rem'}
            close={close}
        >
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
        </DialogWrapper>
    );
};

export default PasswordDialog;
