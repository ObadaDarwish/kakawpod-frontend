import React, { createRef } from 'react';
import user from '../../assets/images/user.png';
import { useSelector } from 'react-redux';
import ButtonUI from '../../components/UI/ButtonUI/ButtonUI';
import InputUI from '../../components/UI/InputUI/InputUI';
import RadioButtonUi from '../../components/UI/RadioButtonUI/RadioButtonUI';

const Profile = () => {
    const nameRef = createRef();
    const emailRef = createRef();
    const phoneRef = createRef();
    const [selectedValue, setSelectedValue] = React.useState(0);
    const User = useSelector((state) => state.user);
    const updateProfile = (e) => {
        e.preventDefault();
    };
    const handleChange = () => {};
    return (
        <form
            className={'profileContainer'}
            noValidate
            autoComplete="off"
            onSubmit={(e) => updateProfile(e)}
        >
            <div className={'formWrapper'}>
                <section className={'profileContainer__profileImageWrapper'}>
                    <img
                        src={user}
                        alt="user profile image"
                        name="user profile image"
                    />
                    <InputUI
                        // error={formData.name.has_error}
                        // errorMessage={formData.name.error_message}
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
                                // error={formData.email.has_error}
                                // errorMessage={formData.email.error_message}
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
                            {User.addresses &&
                                User.addresses.map((address, index) => {
                                    return (
                                        <div
                                            className={
                                                'profileContainer__detailsWrapper__addressWrapper__address__addressContainer'
                                            }
                                        >
                                            <RadioButtonUi
                                                value={index}
                                                isChecked={selectedValue === 0}
                                                handleChange={handleChange}
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
                                })}
                        </div>
                    </div>
                </section>
            </div>
            <div className={'profileContainer__buttonWrapper'}>
                <ButtonUI name={'Save'} type={'submit'} width={'30%'} />
            </div>
        </form>
    );
};

export default Profile;
