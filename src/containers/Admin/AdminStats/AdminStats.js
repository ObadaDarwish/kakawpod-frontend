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
                    <MonthlyStats />
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
