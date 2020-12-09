import React, { useState } from 'react';
import PieChart from '../../../components/Charts/PieChart/PieChart';
import BarChart from '../../../components/Charts/BarChart/BarChart';
import { Menu, MenuItem } from '@material-ui/core';
import { DateRange } from 'react-date-range';
import { format, fromUnixTime } from 'date-fns';
import { useHistory, useLocation } from 'react-router-dom';
import ButtonUI from '../../../components/UI/ButtonUI/ButtonUI';
import GeneralStats from '../../../components/GeneralStats/GeneralStats';
import DailyStats from '../../../components/DailyStats/DailyStats';
import MonthlyStats from '../../../components/MonthlyStats/MonthlyStats';
import useFetchData from '../../../hooks/useFetchData';
import CircularLoadingIndicator from '../../../components/LoadingIndicator/CircularLoadingIndicator';
const queryString = require('query-string');

const AdminStats = () => {
    const location = useLocation();
    const history = useHistory();
    const [openDatePicker, setOpenDatePicker] = useState(null);
    let { startDate, endDate } = queryString.parse(location.search);
    const [selectedDate, setSelectedDate] = useState([
        {
            startDate: startDate ? fromUnixTime(startDate) : new Date(),
            endDate: endDate ? fromUnixTime(endDate) : new Date(),
            key: 'selection',
        },
    ]);
    const [ordersPercentageLoading, ordersPercentage] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/admin/stats/orders`
    );
    const [isLoadingInventory, inventory] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/admin/products/all`
    );
    console.log(inventory);
    const handleClose = () => {
        setOpenDatePicker(null);
    };
    const handleDateChange = (dateEvent) => {
        let formattedStartDate = format(dateEvent.selection.startDate, 't');
        let formattedEndDate = format(dateEvent.selection.endDate, 't');
        history.push({
            pathname: location.pathname,
            search: `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        });
        setSelectedDate([dateEvent.selection]);
    };
    const openDatePickerMenu = (event) => {
        setOpenDatePicker(event.currentTarget);
    };
    return (
        <div className={'adminStatsContainer'}>
            <section className={'adminStatsContainer__topSection'}>
                <div
                    className={
                        'adminStatsContainer__topSection__datePickerWrapper'
                    }
                >
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
                            'adminStatsContainer__topSection__datePickerWrapper__datePicker'
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
            </section>
            <section className={'adminStatsContainer__bottomSection'}>
                <div className={'adminStatsContainer__bottomSection__topBlock'}>
                    <DailyStats startDate={startDate} endDate={endDate} />
                    <GeneralStats />
                </div>

                <div
                    className={
                        'adminStatsContainer__bottomSection__bottomBlock'
                    }
                >
                    <MonthlyStats />
                    {ordersPercentageLoading ? (
                        <CircularLoadingIndicator height={'40rem'} />
                    ) : (
                        <PieChart
                            title={'Orders (Nov, 2020 - Dec, 2020)'}
                            width={550}
                            ordersPercentage={ordersPercentage}
                        />
                    )}
                </div>
            </section>
            <div className={'adminStatsContainer__barChartWrapper'}>
                {isLoadingInventory ? (
                    <CircularLoadingIndicator height={'4rem'} />
                ) : (
                    <BarChart
                        title={'Inventory'}
                        dataList={inventory.products.map((item) => {
                            return {
                                y: item.quantity,
                                name: item.name,
                                color:
                                    item.quantity < item.min_quantity
                                        ? 'red'
                                        : '#7D5A5A',
                            };
                        })}
                        yAxisName={'Inventory (KG)'}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminStats;
