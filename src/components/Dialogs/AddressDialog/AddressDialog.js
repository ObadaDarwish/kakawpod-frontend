import React, { createRef, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import InputUI from '../../UI/InputUI/InputUI';
import { makeStyles } from '@material-ui/core/styles';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import SelectUi from '../../UI/SelectUI/SelectUI';
import useFetchData from '../../../hooks/useFetchData';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useCallServer from '../../../hooks/useCallServer';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/actions/auth_actions';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';
import { setLoading } from '../../../store/actions/loadingIndicator_actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDialog-paper': {
            display: 'flex',
            flexDirection: 'column',
            background: '#F1D1D1',
            minWidth: '50rem',
            [theme.breakpoints.down('sm')]: {
                minWidth: '90%',
            },
        },
        '& .MuiButton-root': {
            marginTop: '2rem',
        },
    },
}));
const AddressDialog = ({
    onClose,
    open,
    status,
    selectedAddress,
    addressesCount,
}) => {
    const classes = useStyles();
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedCity, setSelectedCity] = useState('Cairo');
    const [, , , , callServer] = useCallServer();
    const dispatch = useDispatch();
    const Auth = useSelector((state) => state.user);
    const countryRef = createRef();
    const floorRef = createRef();
    const streetRef = createRef();
    const buildingRef = createRef();
    const apartmentRef = createRef();
    const landmarkRef = createRef();
    let [, areas] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/areas?city=${selectedCity}`
    );
    useEffect(() => {
        if (selectedAddress) {
            setSelectedArea(selectedAddress.area);
            setSelectedCity(selectedAddress.city);
        }
    }, [selectedAddress]);
    const saveAddress = () => {
        let newAddress = {
            country: countryRef.current.value,
            city: selectedCity,
            area: selectedArea,
            street: streetRef.current.value,
            building: buildingRef.current.value,
            apartment: apartmentRef.current.value,
            floor: floorRef.current.value,
            landmark: landmarkRef.current.value,
            primary:
                status === 'add' ? !!!addressesCount : selectedAddress.primary,
        };
        const checkEndPoint = () => {
            dispatch(setLoading(true));
            if (status === 'add') {
                return callServer(
                    'POST',
                    `${process.env.REACT_APP_API_ENDPOINT}/user/address`,
                    newAddress
                );
            } else {
                return callServer(
                    'PUT',
                    `${process.env.REACT_APP_API_ENDPOINT}/user/address/${selectedAddress._id}`,
                    newAddress
                );
            }
        };
        checkEndPoint()
            .then((response) => {
                let newAddressesList = [...Auth.addresses];
                if (status === 'add') {
                    newAddressesList.push({
                        ...newAddress,
                        _id: response.data.address_id,
                        delivery_fees_id: response.data.area,
                    });
                } else {
                    let isFound = newAddressesList.findIndex(
                        (item) =>
                            item._id.toString() ===
                            selectedAddress._id.toString()
                    );
                    if (isFound !== -1) {
                        newAddressesList[isFound] = {
                            ...newAddressesList[isFound],
                            ...newAddress,
                        };
                    }
                }
                let updatedUser = {
                    ...Auth,
                    addresses: newAddressesList,
                };
                dispatch(updateUser(updatedUser));
                successNotification(
                    'Addresses have been updated successfully',
                    'Address'
                );
                onClose();
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Address');
                }
            })
            .finally(() => dispatch(setLoading(false)));
    };
    const cities = ['Cairo', 'Giza'];
    areas =
        areas &&
        areas.map((item) => {
            return item.area;
        });
    const areaChangeHandler = (area) => {
        setSelectedArea(area.target.value);
    };
    const handleCityChange = (city) => {
        setSelectedCity(city.target.value);
    };

    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            className={classes.root}
        >
            <IconButton
                onClick={onClose}
                style={{
                    alignSelf: 'flex-end',
                    margin: '1rem',
                    outline: 'none',
                }}
            >
                <CloseIcon fontSize={'large'} />
            </IconButton>
            <div className={`formWrapper`} style={{ margin: '1.5rem' }}>
                <div
                    className={
                        'formWrapper__inputWrapper formWrapper__inputWrapper--full'
                    }
                >
                    <InputUI
                        reference={countryRef}
                        defaultValue={'Egypt'}
                        label={'country'}
                        required={true}
                        disabled={true}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <SelectUi
                        label={'city'}
                        list={cities}
                        handleChange={handleCityChange}
                        value={selectedCity}
                        required={true}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <SelectUi
                        label={'area'}
                        list={areas}
                        value={selectedArea}
                        handleChange={areaChangeHandler}
                        required={true}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <InputUI
                        defaultValue={selectedAddress && selectedAddress.street}
                        reference={streetRef}
                        label={'street'}
                        required={true}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <InputUI
                        defaultValue={
                            selectedAddress && selectedAddress.building
                        }
                        reference={buildingRef}
                        label={'building name/number'}
                        required={true}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <InputUI
                        defaultValue={selectedAddress && selectedAddress.floor}
                        reference={floorRef}
                        label={'floor number (optional)'}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <InputUI
                        defaultValue={
                            selectedAddress && selectedAddress.apartment
                        }
                        reference={apartmentRef}
                        label={'apartment (optional)'}
                    />
                </div>
                <div
                    className={
                        'formWrapper__inputWrapper formWrapper__inputWrapper--full'
                    }
                >
                    <InputUI
                        defaultValue={
                            selectedAddress && selectedAddress.landmark
                        }
                        reference={landmarkRef}
                        label={'landmark (optional)'}
                    />
                </div>
                <ButtonUI
                    name={status === 'add' ? 'Add' : 'Save'}
                    type={'submit'}
                    clickHandler={saveAddress}
                />
            </div>
        </Dialog>
    );
};

export default AddressDialog;
