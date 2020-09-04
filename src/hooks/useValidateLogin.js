import { useState } from 'react';
import validator from 'validator/es';
const useValidateLogin = () => {
    const [formData, setFormData] = useState({
        email: {
            error_message: '',
            has_error: false,
        },
        password: {
            error_message: '',
            has_error: false,
        },
        is_form_valid: false,
    });

    const validateForm = (email, password) => {
        let emailHasError = !validator.isEmail(email);
        let passwordHasError = !(password.length >= 6);
        let is_form_valid = !emailHasError && !passwordHasError;
        setFormData((prevState) => {
            let prevData = { ...prevState };

            prevData.email = {
                has_error: emailHasError,
                error_message: emailHasError
                    ? 'Wrong or Invalid email address'
                    : '',
            };
            prevData.password = {
                has_error: passwordHasError,
                error_message: passwordHasError
                    ? 'Password must be at least 6 characters long'
                    : '',
            };
            prevData.is_form_valid = is_form_valid;

            return prevData;
        });

        return is_form_valid;
    };
    return [formData, validateForm];
};
export default useValidateLogin;
