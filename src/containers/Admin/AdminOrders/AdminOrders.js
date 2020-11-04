import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AdminOrdersList from '../../../components/AdminOrdersList/AdminOrdersList';
import { DateRange } from 'react-date-range';
import { Menu, MenuItem } from '@material-ui/core';
import { format } from 'date-fns';
import ButtonUI from '../../../components/UI/ButtonUI/ButtonUI';
const queryString = require('query-string');

const AdminOrders = () => {
    const location = useLocation();
    const history = useHistory();
    let { filter, startDate, endDate } = queryString.parse(location.search);
    const pickerRef = useRef();
    const [openDatePicker, setOpenDatePicker] = useState(null);
    const [selectedDate, setSelectedDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const selectFilter = (selectedFilter) => {
        history.push(`/admin/orders?filter=${selectedFilter}`);
    };
    useEffect(() => {
        console.log('call orders');
    }, [startDate, endDate]);

    const handleDateChange = (dateEvent) => {
        let foramtedStardDate = format(dateEvent.selection.startDate, 'PP');
        let formatedEndDate = format(dateEvent.selection.endDate, 'PP');
        history.push({
            pathname: location.pathname,
            search: `?filter=${filter}&startDate=${foramtedStardDate}
            &endDate=${formatedEndDate}`,
        });
        setSelectedDate([dateEvent.selection]);
    };
    const openDatePickerMenu = (event) => {
        setOpenDatePicker(event.currentTarget);
    };
    const handleClose = () => {
        setOpenDatePicker(null);
    };
    return (
        <div className={'adminOrdersContainer'}>
            <div className={'adminOrdersContainer__topBar'}>
                <h1>Orders</h1>
                <div
                    className={'adminOrdersContainer__topBar__datePicker'}
                    ref={pickerRef}
                >
                    <ButtonUI
                        name={`${startDate ? startDate : 'Start Date'} - ${
                            endDate ? endDate : 'End Date'
                        }`}
                        ariaControls="simple-menu"
                        clickHandler={openDatePickerMenu}
                    />
                    <Menu
                        className={
                            'adminOrdersContainer__topBar__datePicker__menu'
                        }
                        open={Boolean(openDatePicker)}
                        id={'simple-menu'}
                        anchorEl={openDatePicker}
                        onClose={handleClose}
                    >
                        <MenuItem>
                            <DateRange
                                onChange={handleDateChange}
                                moveRangeOnFirstSelection={false}
                                ranges={selectedDate}
                                color={'#7D5A5A'}
                                rangeColors={['#7D5A5A']}
                            />
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div className={'adminOrdersContainer__ordersWrapper'}>
                <ul className={'adminOrdersContainer__ordersWrapper__list'}>
                    <li
                        className={`adminOrdersContainer__ordersWrapper__list__item ${
                            filter === 'pending' &&
                            'adminOrdersContainer__ordersWrapper__list__item__selected'
                        }`}
                        onClick={() => selectFilter('pending')}
                    >
                        Pending
                    </li>
                    <li
                        className={`adminOrdersContainer__ordersWrapper__list__item ${
                            filter === 'out for delivery' &&
                            'adminOrdersContainer__ordersWrapper__list__item__selected'
                        }`}
                        onClick={() => selectFilter('out for delivery')}
                    >
                        Out For Delivery
                    </li>
                    <li
                        className={`adminOrdersContainer__ordersWrapper__list__item ${
                            filter === 'delivered' &&
                            'adminOrdersContainer__ordersWrapper__list__item__selected'
                        }`}
                        onClick={() => selectFilter('delivered')}
                    >
                        Delivered
                    </li>
                    <li
                        className={`adminOrdersContainer__ordersWrapper__list__item ${
                            filter === 'canceled' &&
                            'adminOrdersContainer__ordersWrapper__list__item__selected'
                        }`}
                        onClick={() => selectFilter('canceled')}
                    >
                        Canceled
                    </li>
                </ul>

                <AdminOrdersList />
            </div>
        </div>
    );
};

export default AdminOrders;
