import React, { createRef, useState } from 'react';
import user from '../../assets/images/user.png';
import { useDispatch, useSelector } from 'react-redux';
import ButtonUI from '../../components/UI/ButtonUI/ButtonUI';
import InputUI from '../../components/UI/InputUI/InputUI';
import RadioButtonUi from '../../components/UI/RadioButtonUI/RadioButtonUI';
import DataPrompt from '../../components/DataPrompt/DataPrompt';
import PasswordDialog from '../../components/Dialogs/PasswordDialog/PasswordDialog';
import useValidateInputs from '../../hooks/useValidateInputs';
import useCallServer from '../../hooks/useCallServer';
import {
    errorNotification,
    successNotification,
} from '../../utils/notification-utils';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
const Profile = () => {
    const nameRef = createRef();
    const emailRef = createRef();
    const phoneRef = createRef();
    const [selectedValue, setSelectedValue] = useState(0);
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
    const updateProfileHanlder = (e) => {
        e.preventDefault();
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
    const handleAddressChange = () => {};
    return (
        <>
            <PasswordDialog open={openDialog} onClose={closeDialogHandler} />
            <form
                className={'profileContainer'}
                noValidate
                autoComplete="off"
                onSubmit={(e) => updateProfileHanlder(e)}
            >
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
                        <div
                            className={
                                'profileContainer__detailsWrapper__addressWrapper'
                            }
                        >
                            <div
                                className={
                                    'profileContainer__detailsWrapper__addressWrapper__addressButton'
                                }
                            >
                                <ButtonUI name={'Add address'} />
                            </div>
                            <div
                                className={
                                    'profileContainer__detailsWrapper__addressWrapper__address'
                                }
                            >
                                {User.addresses && User.addresses.length ? (
                                    User.addresses.map((address, index) => {
                                        return (
                                            <div
                                                key={address._id}
                                                className={
                                                    'profileContainer__detailsWrapper__addressWrapper__address__addressContainer'
                                                }
                                            >
                                                <RadioButtonUi
                                                    value={index}
                                                    isChecked={
                                                        selectedValue === 0
                                                    }
                                                    handleChange={
                                                        handleAddressChange
                                                    }
                                                    ariaLabel={'address 1'}
                                                />
                                                <div
                                                    className={
                                                        'profileContainer__detailsWrapper__addressWrapper__address__addressContainer__addressWrapper'
                                                    }
                                                >
                                                    <p>
                                                        {address.apartment},
                                                        {address.floor},
                                                        {address.building}
                                                    </p>
                                                    <p> {address.street}</p>
                                                    <p>{address.area}</p>
                                                    <p>{address.city}</p>
                                                    <p>{address.country}</p>
                                                    <p>{User.phone}</p>
                                                    <button
                                                        className={
                                                            'profileContainer__detailsWrapper__addressWrapper__address__addressContainer__addressWrapper__editButton'
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <DataPrompt
                                        message={'No addresses were found.'}
                                    />
                                )}
                            </div>
                        </div>
                    </section>
                </div>
                <div className={'profileContainer__buttonWrapper'}>
                    <ButtonUI name={'Save'} type={'submit'} width={'30%'} />
                </div>
            </form>
        </>
    );
};

export default Profile;
