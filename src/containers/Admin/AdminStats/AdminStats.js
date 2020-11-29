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
    const [selectLineChart, setSelectedLineChart] = useState('revenue');
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
    return (
        <div className={'adminStatsContainer'}>
            <section className={'adminStatsContainer__topSection'} />
            <section className={'adminStatsContainer__bottomSection'}>
                <div
                    className={'adminStatsContainer__bottomSection__leftBlock'}
                >
                    <StatBlock
                        background={'#7D5A5A'}
                        color={'#fff'}
                        amount={'EGP5,000'}
                        title={'Revenue'}
                    >
                        <AttachMoneyIcon fontSize={'large'} />
                    </StatBlock>
                    <StatBlock amount={'EGP1,500'} title={'Discounts'}>
                        <MoneyOffIcon fontSize={'large'} />
                    </StatBlock>
                    <StatBlock amount={'150'} title={'Users'}>
                        <GroupIcon fontSize={'large'} />
                    </StatBlock>
                    <div className={'blockGroup'}>
                        <div className={'blockGroup__groupData'}>
                            <p>250</p>
                            <p>Orders</p>
                        </div>
                        <div className={'blockGroup__subStats'}>
                            <StatBlock amount={'100'} title={'Shop orders'}>
                                <StoreIcon fontSize={'large'} />
                            </StatBlock>
                            <StatBlock amount={'150'} title={'Online orders'}>
                                <ShoppingCartIcon fontSize={'large'} />
                            </StatBlock>
                        </div>
                    </div>
                    <div
                        className={
                            'adminStatsContainer__bottomSection__leftBlock__generalStats'
                        }
                    >
                        <h1
                            className={
                                'adminStatsContainer__bottomSection__leftBlock__generalStats__title'
                            }
                        >
                            General Stats
                        </h1>
                        <div
                            className={
                                'adminStatsContainer__bottomSection__leftBlock__generalStats__wrapper'
                            }
                        >
                            <StatBlock amount={'1500'} title={'Orders'}>
                                <LocalMallIcon fontSize={'large'} />
                            </StatBlock>
                            <StatBlock amount={'42'} title={'Users'}>
                                <GroupIcon fontSize={'large'} />
                            </StatBlock>
                            <StatBlock amount={'112'} title={'Codes'}>
                                <CodeIcon fontSize={'large'} />
                            </StatBlock>
                            <StatBlock amount={'43'} title={'Products'}>
                                <LabelIcon fontSize={'large'} />
                            </StatBlock>
                        </div>
                    </div>
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
                        ['milk bar', 50],
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
