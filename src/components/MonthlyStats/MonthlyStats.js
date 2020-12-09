import React, { useEffect, useState } from 'react';
import LineChart from '../Charts/LineChart/LineChart';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';

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
const MonthlyStats = () => {
    const [selectLineChart, setSelectedLineChart] = useState('revenue');
    const [lineChartData, setLineChartData] = useState([
        {
            name: 'Revenue',
            data: [],
        },
    ]);
    const [monthlyStatsLoading, monthlyStats] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/admin/stats/monthly`
    );
    useEffect(() => {
        let canUpdate = true;
        if (canUpdate && monthlyStats) {
            setLineChartData([
                {
                    name: 'Revenue',
                    data: monthlyStats.map((stats) => {
                        return stats.revenue;
                    }),
                },
            ]);
        }
        return () => {
            canUpdate = false;
        };
    }, [monthlyStats]);

    const handleLineChartSelection = (chart) => {
        setSelectedLineChart(chart);
        setLineChartData(() => {
            let data = [];
            switch (chart) {
                case 'orders': {
                    data = monthlyStats.map((stats) => {
                        return stats.online_orders + stats.shop_orders;
                    });
                    break;
                }
                case 'users': {
                    data = monthlyStats.map((stats) => {
                        return stats.users;
                    });
                    break;
                }
                default: {
                    data = monthlyStats.map((stats) => {
                        return stats.revenue;
                    });
                }
            }
            return [
                {
                    name: chart,
                    data: data,
                },
            ];
        });
    };
    return (
        <>
            <div
                className={
                    'adminStatsContainer__bottomSection__bottomBlock__tabs'
                }
            >
                <div
                    className={`adminStatsContainer__bottomSection__bottomBlock__tabs__tab 
                            ${
                                selectLineChart === 'revenue'
                                    ? 'adminStatsContainer__bottomSection__bottomBlock__tabs__tab--active'
                                    : ''
                            }`}
                    onClick={() => handleLineChartSelection('revenue')}
                >
                    Revenue
                </div>
                <div
                    className={`adminStatsContainer__bottomSection__bottomBlock__tabs__tab       ${
                        selectLineChart === 'orders'
                            ? 'adminStatsContainer__bottomSection__bottomBlock__tabs__tab--active'
                            : ''
                    }`}
                    onClick={() => handleLineChartSelection('orders')}
                >
                    Orders
                </div>
                <div
                    className={`adminStatsContainer__bottomSection__bottomBlock__tabs__tab       ${
                        selectLineChart === 'users'
                            ? 'adminStatsContainer__bottomSection__bottomBlock__tabs__tab--active'
                            : ''
                    }`}
                    onClick={() => handleLineChartSelection('users')}
                >
                    Users
                </div>
            </div>
            {monthlyStatsLoading ? (
                <CircularLoadingIndicator height={'40rem'} />
            ) : (
                <LineChart
                    title={'Revenue (Nov, 2020 - Dec, 2020)'}
                    xAxisCategories={months}
                    yAxisName={'Total (EGP)'}
                    seriesList={lineChartData}
                />
            )}
        </>
    );
};

export default MonthlyStats;
