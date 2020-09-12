import React, { useState } from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import RadioButtonUi from '../UI/RadioButtonUI/RadioButtonUI';
import DataPrompt from '../DataPrompt/DataPrompt';
import AddressDialog from '../Dialogs/AddressDialog/AddressDialog';
const AddressComponent = ({ user }) => {
    const [selectedValue, setSelectedValue] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const handleAddressChange = (value) => {
        console.log(value);
    };
    const handleDialog = () => {
        setOpenDialog(true);
    };
    return (
        <>
            <AddressDialog open={openDialog} />
            <div className={'profileContainer__detailsWrapper__addressWrapper'}>
                <div
                    className={
                        'profileContainer__detailsWrapper__addressWrapper__addressButton'
                    }
                >
                    <ButtonUI
                        clickHandler={handleDialog}
                        name={'Add address'}
                    />
                </div>
                <div
                    className={
                        'profileContainer__detailsWrapper__addressWrapper__address'
                    }
                >
                    {user.addresses && user.addresses.length ? (
                        user.addresses.map((address, index) => {
                            return (
                                <div
                                    key={address._id}
                                    className={
                                        'profileContainer__detailsWrapper__addressWrapper__address__addressContainer'
                                    }
                                >
                                    <RadioButtonUi
                                        value={index}
                                        isChecked={selectedValue === 0}
                                        handleChange={handleAddressChange}
                                        ariaLabel={'address 1'}
                                    />
                                    <div
                                        className={
                                            'profileContainer__detailsWrapper__addressWrapper__address__addressContainer__addressWrapper'
                                        }
                                    >
                                        <p>
                                            {address.apartment},{address.floor},
                                            {address.building}
                                        </p>
                                        <p> {address.street}</p>
                                        <p>{address.area}</p>
                                        <p>{address.city}</p>
                                        <p>{address.country}</p>
                                        <p>{user.phone}</p>
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
                        <DataPrompt message={'No addresses were found.'} />
                    )}
                </div>
            </div>
        </>
    );
};

export default AddressComponent;
