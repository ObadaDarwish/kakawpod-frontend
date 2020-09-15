import React, { createRef, useState } from 'react';
import user from '../../assets/images/user.png';
import { useDispatch, useSelector } from 'react-redux';
import ButtonUI from '../../components/UI/ButtonUI/ButtonUI';
import InputUI from '../../components/UI/InputUI/InputUI';
import PasswordDialog from '../../components/Dialogs/PasswordDialog/PasswordDialog';
import useValidateInputs from '../../hooks/useValidateInputs';
import useCallServer from '../../hooks/useCallServer';
import AddressComponent from '../../components/AddressComponent/AddressComponent';
import {
    errorNotification,
    successNotification,
} from '../../utils/notification-utils';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
const Profile = () => {
    const nameRef = createRef();
    const emailRef = createRef();
    const phoneRef = createRef();
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, validateForm] = useValidateInputs();
    const [, , , , callServer] = useCallServer();
    const User = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const updateProfile = (password = null) => {
        dispatch(setLoading(true));
        callServer('PUT', `${process.env.REACT_APP_API_ENDPOINT}/user/update`, {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: password,
        })
            .then(() => {
                successNotification(
                    'Profile has been updated successfully',
                    'Profile'
                );
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Profile');
                }
            })
            .finally(() => dispatch(setLoading(false)));
    };
    const updateProfileHandler = () => {
        let emailValue = emailRef.current.value;
        if (emailValue !== User.email) {
            setOpenDialog(true);
        } else {
            if (validateForm(nameRef.current.value, emailValue, null, null)) {
                updateProfile();
            }
        }
    };
    const closeDialogHandler = (value) => {
        setOpenDialog(false);
        updateProfile(value);
    };

    return (
        <>
            <PasswordDialog open={openDialog} onClose={closeDialogHandler} />
            <div className={'profileContainer'}>
                <div className={'formWrapper'}>
                    <section
                        className={'profileContainer__profileImageWrapper'}
                    >
                        <img
                            src={user}
                            alt="user profile image"
                            name="user profile image"
                        />
                        <InputUI
                            error={formData.name.has_error}
                            errorMessage={formData.name.error_message}
                            defaultValue={User.name}
                            reference={nameRef}
                            label={'name'}
                            required={true}
                        />
                    </section>
                    <section className={'profileContainer__detailsWrapper'}>
                        <div
                            className={
                                'profileContainer__detailsWrapper__contactWrapper'
                            }
                        >
                            <div
                                className={
                                    'profileContainer__detailsWrapper__contactWrapper__inputWrapper'
                                }
                            >
                                <InputUI
                                    error={formData.email.has_error}
                                    errorMessage={formData.email.error_message}
                                    reference={emailRef}
                                    label={'email'}
                                    required={true}
                                    defaultValue={User.email}
                                />
                            </div>
                            <div
                                className={
                                    'profileContainer__detailsWrapper__contactWrapper__inputWrapper'
                                }
                            >
                                <InputUI
                                    // error={formData.email.has_error}
                                    // errorMessage={formData.email.error_message}
                                    reference={phoneRef}
                                    label={'phone'}
                                    required={true}
                                    defaultValue={User.phone}
                                />
                            </div>
                        </div>
                        <AddressComponent user={User} />
                    </section>
                </div>
                <div className={'profileContainer__buttonWrapper'}>
                    <ButtonUI
                        clickHandler={updateProfileHandler}
                        name={'Save'}
                        type={'submit'}
                        width={'30%'}
                    />
                </div>
            </div>
        </>
    );
};

export default Profile;
