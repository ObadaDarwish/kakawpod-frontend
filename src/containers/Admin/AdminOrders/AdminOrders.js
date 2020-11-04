import React, { useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AdminOrdersList from '../../../components/AdminOrdersList/AdminOrdersList';
import { DateRange } from 'react-date-range';
import { Menu, MenuItem } from '@material-ui/core';
import { format, fromUnixTime } from 'date-fns';
import ButtonUI from '../../../components/UI/ButtonUI/ButtonUI';
import useFetchAdminOrders from '../../../hooks/useFetchAdminOrders';
const queryString = require('query-string');

const AdminOrders = () => {
    const location = useLocation();
    const history = useHistory();
    let { filter = 'pending', startDate, endDate } = queryString.parse(
        location.search
    );
    const [openDatePicker, setOpenDatePicker] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState([
        {
            startDate: startDate ? fromUnixTime(startDate) : new Date(),
            endDate: endDate ? fromUnixTime(endDate) : new Date(),
            key: 'selection',
        },
    ]);
    const [areOrdersLoading, fetchedOrders] = useFetchAdminOrders(
        `${process.env.REACT_APP_API_ENDPOINT}/admin/orders?status=${filter}${
            startDate ? '&start_at=' + startDate : ''
        }${endDate ? '&end_at=' + endDate : ''}&page=${page}`,
        page
    );
    const selectFilter = (selectedFilter) => {
        setPage(1);
        history.push({
            pathname: location.pathname,
            search: `?filter=${selectedFilter}${
                startDate ? '&startDate=' + startDate : ''
            }${endDate ? '&endDate=' + endDate : ''}`,
        });
    };

    const handleDateChange = (dateEvent) => {
        let formattedStartDate = format(dateEvent.selection.startDate, 't');
        let formattedEndDate = format(dateEvent.selection.endDate, 't');
        history.push({
            pathname: location.pathname,
            search: `?filter=${filter}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        });
        setSelectedDate([dateEvent.selection]);
    };
    const openDatePickerMenu = (event) => {
        setOpenDatePicker(event.currentTarget);
    };
    const handleClose = () => {
        setOpenDatePicker(null);
    };
    const handleNextPage = () => {
        let noOfPages = Math.ceil(fetchedOrders.total / 20);
        let newPage = page + 1;
        if (newPage <= noOfPages) {
            setPage(newPage);
        }
    };
    return (
        <div className={'adminOrdersContainer'}>
            <div className={'adminOrdersContainer__topBar'}>
                <h1>{fetchedOrders.total} Orders</h1>
                <div className={'adminOrdersContainer__topBar__datePicker'}>
                    <ButtonUI
                        name={`${
                            startDate
                                ? format(fromUnixTime(startDate), 'PP')
                                : 'Start Date'
                        } - ${
                            endDate
                                ? format(fromUnixTime(endDate), 'PP')
                                : 'End Date'
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
                    <li
                        className={`adminOrdersContainer__ordersWrapper__list__item ${
                            filter === 'completed' &&
                            'adminOrdersContainer__ordersWrapper__list__item__selected'
                        }`}
                        onClick={() => selectFilter('completed')}
                    >
                        Shop
                    </li>
                </ul>

                <AdminOrdersList
                    orders={fetchedOrders}
                    areOrdersLoading={areOrdersLoading}
                    incrementPage={handleNextPage}
                />
            </div>
        </div>
    );
};

export default AdminOrders;
