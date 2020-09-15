import React, { useState } from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import RadioButtonUi from '../UI/RadioButtonUI/RadioButtonUI';
import DataPrompt from '../DataPrompt/DataPrompt';
import AddressDialog from '../Dialogs/AddressDialog/AddressDialog';
import ConfirmDialog from '../Dialogs/ConfirmDialog/ConfirmDialog';
import useCallServer from '../../hooks/useCallServer';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import {
    errorNotification,
    successNotification,
} from '../../utils/notification-utils';
import { updateUser } from '../../store/actions/auth_actions';
const AddressComponent = ({ user }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedAddressData, setSelectedAddressData] = useState(null);
    const [dialogStatus, setDialogStatus] = useState('add');
    const [, , , , callServer] = useCallServer();
    const dispatch = useDispatch();
    const handleAddressChange = (e, address) => {
        const event = e.target;
        dispatch(setLoading(true));
        callServer(
            'PUT',
            `${process.env.REACT_APP_API_ENDPOINT}/user/address/${address._id}`,
            { primary: true }
        )
            .then(() => {
                let newUser = { ...user };
                let updatedAddress = [...user.addresses];
                updatedAddress.forEach((item, index) => {
                    if (item._id === address._id) {
                        updatedAddress[index].primary = true;
                    } else {
                        updatedAddress[index].primary = false;
                    }
                });
                newUser.addresses = updatedAddress;
                dispatch(updateUser(newUser));
                successNotification(
                    'Primary address has been successfully set',
                    'Primary address'
                );
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Address');
                }
            })
            .finally(() => dispatch(setLoading(false)));
    };
    const addAddressDialog = () => {
        setDialogStatus('add');
        setOpenDialog(true);
    };
    const closeDialog = () => {
        setOpenDialog(false);
    };
    const editAddressHandler = (address) => {
        setDialogStatus('edit');
        setOpenDialog(true);
        setSelectedAddressData(address);
    };
    const confirmAddressDeletion = (address) => {
        setOpenConfirmDialog(true);
        setSelectedAddressData(address);
    };
    const deleteAddressHandler = () => {
        dispatch(setLoading(true));
        callServer(
            'DELETE',
            `${process.env.REACT_APP_API_ENDPOINT}/user/address/${selectedAddressData._id}`
        )
            .then(() => {
                let newUser = { ...user };
                let updatedAddress = [...user.addresses];
                let isFound = updatedAddress.findIndex(
                    (item) => item._id === selectedAddressData._id
                );
                if (isFound !== -1) {
                    updatedAddress.splice(isFound, 1);
                }
                newUser.addresses = updatedAddress;
                dispatch(updateUser(newUser));
                successNotification(
                    'Address has been deleted successfully',
                    'Delete address'
                );
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Address');
                }
            })
            .finally(() => {
                setOpenConfirmDialog(false);
                dispatch(setLoading(false));
            });
    };

    return (
        <>
            <AddressDialog
                open={openDialog}
                status={dialogStatus}
                selectedAddress={selectedAddressData}
                addressesCount={user.addresses.length}
                onClose={closeDialog}
            />
            <ConfirmDialog
                open={openConfirmDialog}
                checkText={'delete'}
                onClose={deleteAddressHandler}
            />
            <div className={'profileContainer__detailsWrapper__addressWrapper'}>
                <div
                    className={
                        'profileContainer__detailsWrapper__addressWrapper__addressButton'
                    }
                >
                    <ButtonUI
                        clickHandler={addAddressDialog}
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
                                        value={address.primary}
                                        isChecked={address.primary}
                                        handleChange={(e) =>
                                            handleAddressChange(e, address)
                                        }
                                        ariaLabel={'address 1'}
                                    />
                                    <div
                                        className={
                                            'profileContainer__detailsWrapper__addressWrapper__address__addressContainer__addressWrapper'
                                        }
                                    >
                                        <p>
                                            {address.apartment &&
                                                `Apartment: ${address.apartment}, `}
                                            {address.floor &&
                                                `Floor: ${address.floor}, `}
                                            Building: {address.building}
                                        </p>
                                        <p> {address.street}</p>
                                        <p>{address.area}</p>
                                        <p>{address.city}</p>
                                        <p>{address.country}</p>
                                        <p>{address.landmark}</p>
                                        <p>{user.phone}</p>
                                        <div
                                            className={
                                                'profileContainer__detailsWrapper__addressWrapper__address__addressContainer__addressWrapper__control'
                                            }
                                        >
                                            <button
                                                className={
                                                    'profileContainer__detailsWrapper__addressWrapper__address__addressContainer__addressWrapper__control__Button'
                                                }
                                                onClick={() =>
                                                    editAddressHandler(address)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={
                                                    'profileContainer__detailsWrapper__addressWrapper__address__addressContainer__addressWrapper__control__Button'
                                                }
                                                onClick={() =>
                                                    confirmAddressDeletion(
                                                        address
                                                    )
                                                }
                                            >
                                                delete
                                            </button>
                                        </div>
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
