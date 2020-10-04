import React, { createRef, useState } from 'react';
import userImage from '../../assets/images/user.png';
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
import VerifyPhoneDialog from '../../components/Dialogs/VerifyPhoneDialog/VerifyPhoneDialog';
import { updateUser } from '../../store/actions/auth_actions';

const Profile = () => {
    const nameRef = createRef();
    const emailRef = createRef();
    const phoneRef = createRef();
    const [openDialog, setOpenDialog] = useState(false);
    const [openPhoneDialog, setOpenPhoneDialog] = useState({
        phone: '',
        canOpen: false,
    });
    const [formData, validateForm] = useValidateInputs();
    const [, , , , callServer, loadUpdate, setLoadUpdate] = useCallServer();
    const User = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const updateProfile = (password = null) => {
        dispatch(setLoading(true));
        setLoadUpdate(true);
        callServer('PUT', `${process.env.REACT_APP_API_ENDPOINT}/user/update`, {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: password,
            phone: phoneRef.current.value,
        })
            .then((response) => {
                successNotification(
                    'Profile has been updated successfully',
                    'Profile'
                );
                let {
                    name,
                    email,
                    phone,
                    phone_verified,
                    email_verified,
                } = response.data;
                let updatedUser = {
                    ...User,
                    name: name,
                    email: email,
                    phone: phone,
                    phone_verified: phone_verified,
                    email_verified: email_verified,
                };
                dispatch(updateUser(updatedUser));
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Profile');
                }
            })
            .finally(() => {
                setLoadUpdate(false);
                dispatch(setLoading(false));
            });
    };
    const updateProfileHandler = () => {
        let emailValue = emailRef.current.value;
        if (emailValue !== User.email) {
            setOpenDialog(true);
        } else {
            if (
                validateForm(
                    nameRef.current.value,
                    emailValue,
                    null,
                    null,
                    phoneRef.current.value
                )
            ) {
                updateProfile();
            }
        }
    };
    const closeDialogHandler = (value) => {
        setOpenDialog(false);
        updateProfile(value);
    };

    const closePasswordDialog = () => {
        setOpenDialog(false);
    };
    const verifyPhoneNumber = () => {
        if (validateForm(null, null, null, null, phoneRef.current.value)) {
            setOpenPhoneDialog({
                phone: phoneRef.current.value,
                canOpen: true,
            });
        }
    };
    const closePhoneDialog = () => {
        setOpenPhoneDialog({
            phone: '',
            canOpen: false,
        });
    };
    const handlePhoneVerification = () => {
        closePhoneDialog();
        let newUser = { ...User };
        newUser.phone_verified = true;
        dispatch(updateUser(newUser));
    };
    return (
        <>
            <PasswordDialog
                open={openDialog}
                onClose={closeDialogHandler}
                close={closePasswordDialog}
            />
            <VerifyPhoneDialog
                open={openPhoneDialog.canOpen}
                phone={openPhoneDialog.phone}
                onClose={handlePhoneVerification}
                close={closePhoneDialog}
            />
            <div className={'profileContainer'}>
                <div className={'formWrapper'}>
                    <section
                        className={'profileContainer__profileImageWrapper'}
                    >
                        <img
                            src={userImage}
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
                                    error={formData.phone.has_error}
                                    errorMessage={formData.phone.error_message}
                                    reference={phoneRef}
                                    label={'phone'}
                                    required={true}
                                    defaultValue={User.phone}
                                />
                                {!User.phone_verified && (
                                    <ButtonUI
                                        name={'verify'}
                                        width={'12rem'}
                                        clickHandler={verifyPhoneNumber}
                                        is_disabled={loadUpdate}
                                    />
                                )}
                            </div>
                        </div>
                        <AddressComponent
                            user={User}
                            addressTitle={'Addresses'}
                        />
                    </section>
                </div>
                <div className={'profileContainer__buttonWrapper'}>
                    <ButtonUI
                        clickHandler={updateProfileHandler}
                        name={'Save'}
                        type={'submit'}
                        width={'30%'}
                        is_disabled={loadUpdate}
                    />
                </div>
            </div>
        </>
    );
};

export default Profile;
