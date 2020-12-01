import React, { useState } from 'react';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import CodeIcon from '@material-ui/icons/Code';
import LabelIcon from '@material-ui/icons/Label';
import LineChart from '../../../components/Charts/LineChart/LineChart';
import StatBlock from '../../../components/StatBlock/StatBlock';
import PieChart from '../../../components/Charts/PieChart/PieChart';
import BarChart from '../../../components/Charts/BarChart/BarChart';
import { Menu, MenuItem } from '@material-ui/core';
import { DateRange } from 'react-date-range';
import { format, fromUnixTime } from 'date-fns';
import { useHistory, useLocation } from 'react-router-dom';
import ButtonUI from '../../../components/UI/ButtonUI/ButtonUI';
import useFetchData from '../../../hooks/useFetchData';
import CircularLoadingIndicator from '../../../components/LoadingIndicator/CircularLoadingIndicator';
import DataPrompt from '../../../components/DataPrompt/DataPrompt';
import GeneralStats from '../../../components/GeneralStats/GeneralStats';
import DailyStats from '../../../components/DailyStats/DailyStats';
const queryString = require('query-string');
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const AdminStats = () => {
    const location = useLocation();
    const history = useHistory();
    const [openDatePicker, setOpenDatePicker] = useState(null);
    let { startDate, endDate } = queryString.parse(location.search);
    const [selectLineChart, setSelectedLineChart] = useState('revenue');
    const [selectedDate, setSelectedDate] = useState([
        {
            startDate: startDate ? fromUnixTime(startDate) : new Date(),
            endDate: endDate ? fromUnixTime(endDate) : new Date(),
            key: 'selection',
        },
    ]);
    const [lineChartData, setLineChartData] = useState([
        {
            name: 'Months',
            data: [1000, 2000, 3000, 8000, 1000, 12000],
        },
    ]);

    const handleLineChartSelection = (chart) => {
        setSelectedLineChart(chart);
        setLineChartData([
            {
                name: 'Months',
                data: [5000, 3200, 3000, 8000, 1000, 4350],
            },
        ]);
    };
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
                <div
                    className={'adminStatsContainer__bottomSection__leftBlock'}
                >
                    <DailyStats startDate={startDate} endDate={endDate} />
                    <GeneralStats />
                </div>

                <div
                    className={'adminStatsContainer__bottomSection__rightBlock'}
                >
                    <div
                        className={
                            'adminStatsContainer__bottomSection__rightBlock__tabs'
                        }
                    >
                        <div
                            className={`adminStatsContainer__bottomSection__rightBlock__tabs__tab 
                            ${
                                selectLineChart === 'revenue'
                                    ? 'adminStatsContainer__bottomSection__rightBlock__tabs__tab--active'
                                    : ''
                            }`}
                            onClick={() => handleLineChartSelection('revenue')}
                        >
                            Revenue
                        </div>
                        <div
                            className={`adminStatsContainer__bottomSection__rightBlock__tabs__tab       ${
                                selectLineChart === 'orders'
                                    ? 'adminStatsContainer__bottomSection__rightBlock__tabs__tab--active'
                                    : ''
                            }`}
                            onClick={() => handleLineChartSelection('orders')}
                        >
                            Orders
                        </div>
                        <div
                            className={`adminStatsContainer__bottomSection__rightBlock__tabs__tab       ${
                                selectLineChart === 'users'
                                    ? 'adminStatsContainer__bottomSection__rightBlock__tabs__tab--active'
                                    : ''
                            }`}
                            onClick={() => handleLineChartSelection('users')}
                        >
                            Users
                        </div>
                    </div>
                    <LineChart
                        title={'Revenue (Nov, 2020 - Dec, 2020)'}
                        xAxisCategories={months}
                        yAxisName={'Total (EGP)'}
                        seriesList={lineChartData}
                        width={550}
                    />
                    <PieChart
                        title={'Orders (Nov, 2020 - Dec, 2020)'}
                        width={550}
                    />
                </div>
            </section>
            <div className={'adminStatsContainer__barChartWrapper'}>
                <BarChart
                    title={'Inventory'}
                    dataList={[
                        ['milk bar', 50, { color: 'green' }],
                        ['milk almond bar', 230],
                        ['milk hazelnut bar', 420],
                        ['milk cashew bar', 30],
                        ['60% dark bar', 50],
                        ['60% dark almond bar', 230],
                        ['60% dark hazelnut bar', 420],
                        ['60% dark cashew bar', 30],
                        ['70% dark bar', 50],
                        ['70% dark almond bar', 230],
                        ['70% dark hazelnut bar', 420],
                        ['70% dark cashew bar', 30],
                        ['90% dark bar', 50],
                        ['90% dark almond bar', 230],
                        ['90% dark hazelnut bar', 420],
                        ['90% dark cashew bar', 30],
                        ['white bar', 50],
                        ['white almond bar', 230],
                        ['white hazelnut bar', 420],
                        ['white cashew bar', 30],
                    ]}
                    yAxisName={'Inventory (KG)'}
                />
            </div>
        </div>
    );
};

export default AdminStats;
