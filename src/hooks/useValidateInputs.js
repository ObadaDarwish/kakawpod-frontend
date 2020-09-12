import { useState } from 'react';
import validator from 'validator/es';
const useValidateInputs = () => {
    const [formData, setFormData] = useState({
        name: {
            error_message: '',
            has_error: false,
        },
        email: {
            error_message: '',
            has_error: false,
        },
        password: {
            error_message: '',
            has_error: false,
        },
        confirmPassword: {
            error_message: '',
            has_error: false,
        },
        is_form_valid: false,
    });

    const validateForm = (name, email, password, confirmPassword) => {
        let nameHasError = name && !(name.length >= 6);
        let emailHasError = email && !validator.isEmail(email);
        let passwordHasError = password && !(password.length >= 6);
        let passwordMatchHasError =
            confirmPassword && !validator.equals(password, confirmPassword);
        let is_form_valid =
            !nameHasError &&
            !emailHasError &&
            !passwordHasError &&
            !passwordMatchHasError;
        setFormData((prevState) => {
            let prevData = { ...prevState };

            prevData.name = {
                has_error: nameHasError,
                error_message: nameHasError
                    ? 'Name must be at least 6 characters long'
                    : '',
            };
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
            prevData.confirmPassword = {
                has_error: passwordMatchHasError,
                error_message: passwordMatchHasError
                    ? 'Password does not match'
                    : '',
            };
            prevData.is_form_valid = is_form_valid;

            return prevData;
        });

        return is_form_valid;
    };
    return [formData, validateForm];
};
export default useValidateInputs;
