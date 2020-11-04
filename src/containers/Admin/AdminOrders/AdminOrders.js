import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AdminOrdersList from '../../../components/AdminOrdersList/AdminOrdersList';
import { DateRange } from 'react-date-range';
import { da } from 'react-date-range/dist/locale';
const queryString = require('query-string');

const AdminOrders = () => {
    const location = useLocation();
    const history = useHistory();
    let { filter } = queryString.parse(location.search);
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

    const handleDateChange = (dateEvent) => {
        console.log(dateEvent);
        setSelectedDate([dateEvent.selection]);
    };
    return (
        <div className={'adminOrdersContainer'}>
            <div className={'adminOrdersContainer__topBar'}>
                <h1>Orders</h1>
                <ul className={'adminOrdersContainer__topBar__list'}>
                    <li
                        className={`adminOrdersContainer__topBar__list__item ${
                            filter === 'pending' &&
                            'adminOrdersContainer__topBar__list__item__selected'
                        }`}
                        onClick={() => selectFilter('pending')}
                    >
                        Pending
                    </li>
                    <li
                        className={`adminOrdersContainer__topBar__list__item ${
                            filter === 'out for delivery' &&
                            'adminOrdersContainer__topBar__list__item__selected'
                        }`}
                        onClick={() => selectFilter('out for delivery')}
                    >
                        Out For Delivery
                    </li>
                    <li
                        className={`adminOrdersContainer__topBar__list__item ${
                            filter === 'delivered' &&
                            'adminOrdersContainer__topBar__list__item__selected'
                        }`}
                        onClick={() => selectFilter('delivered')}
                    >
                        Delivered
                    </li>
                    <li
                        className={`adminOrdersContainer__topBar__list__item ${
                            filter === 'canceled' &&
                            'adminOrdersContainer__topBar__list__item__selected'
                        }`}
                        onClick={() => selectFilter('canceled')}
                    >
                        Canceled
                    </li>
                </ul>
            </div>
            <div className={'adminOrdersContainer__ordersWrapper'}>
                <div
                    className={
                        'adminOrdersContainer__ordersWrapper__datePicker'
                    }
                >
                    <DateRange
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={selectedDate}
                        color={'#7D5A5A'}
                        rangeColors={['#7D5A5A']}
                    />
                </div>

                <AdminOrdersList />
            </div>
        </div>
    );
};

export default AdminOrders;
