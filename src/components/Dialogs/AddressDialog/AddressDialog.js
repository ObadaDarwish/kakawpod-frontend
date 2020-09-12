import React, { createRef, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import InputUI from '../../UI/InputUI/InputUI';
import useValidateInputs from '../../../hooks/useValidateInputs';
import { makeStyles } from '@material-ui/core/styles';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import SelectUi from '../../UI/SelectUI/SelectUI';
import useFetchData from '../../../hooks/useFetchData';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDialog-paper': {
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
const AddressDialog = ({ onClose, open }) => {
    const classes = useStyles();
    const [formData, validateForm] = useValidateInputs();
    const [selectedArea, setselectedArea] = useState('');
    const countryRef = createRef();
    const cityRef = createRef();
    const areaRef = createRef();
    const floorNumber = createRef();
    const streetRef = createRef();
    const buildingRef = createRef();
    const apartmentRef = createRef();
    const landmarkRef = createRef();
    let [isAreasLoading, areas] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/areas`
    );
    const saveAddress = (e) => {
        e.preventDefault();
    };
    const cities = ['Cairo'];
    areas =
        areas &&
        areas.map((item) => {
            return item.area;
        });
    const areaChangeHandler = (area) => {
        setselectedArea(area.target.value);
    };
    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            className={classes.root}
        >
            <form
                className={`formWrapper`}
                style={{ margin: '2rem' }}
                onSubmit={(e) => saveAddress(e)}
            >
                <div
                    className={
                        'formWrapper__inputWrapper formWrapper__inputWrapper--full'
                    }
                >
                    <InputUI
                        // error={formData.password.has_error}
                        // errorMessage={formData.password.error_message}
                        reference={countryRef}
                        label={'country'}
                        required={true}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <SelectUi
                        label={'city'}
                        list={cities}
                        value={'Cairo'}
                        required={true}
                        disabled={true}
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
                        // error={formData.password.has_error}
                        // errorMessage={formData.password.error_message}
                        reference={streetRef}
                        label={'street'}
                        required={true}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <InputUI
                        // error={formData.password.has_error}
                        // errorMessage={formData.password.error_message}
                        reference={buildingRef}
                        label={'building name/number'}
                        required={true}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <InputUI
                        // error={formData.password.has_error}
                        // errorMessage={formData.password.error_message}
                        reference={floorNumber}
                        label={'floor number (optional)'}
                    />
                </div>
                <div className={'formWrapper__inputWrapper'}>
                    <InputUI
                        // error={formData.password.has_error}
                        // errorMessage={formData.password.error_message}
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
                        // error={formData.password.has_error}
                        // errorMessage={formData.password.error_message}
                        reference={landmarkRef}
                        label={'landmark (optional)'}
                    />
                </div>
                <ButtonUI name={'Submit'} type={'submit'} />
            </form>
        </Dialog>
    );
};

export default AddressDialog;
