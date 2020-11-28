import React from 'react';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LineChart from '../../../components/Charts/LineChart/LineChart';
import StatBlock from '../../../components/StatBlock/StatBlock';
import PieChart from '../../../components/Charts/PieChart/PieChart';

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
    const seriesList = [
        {
            name: 'Months',
            data: [1000, 2000, 3000, 8000, 1000, 12000],
        },
    ];
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
                </div>
                <div
                    className={'adminStatsContainer__bottomSection__rightBlock'}
                >
                    <LineChart
                        title={'Revenue time line'}
                        xAxisCategories={months}
                        yAxisName={'Total (EGP)'}
                        seriesList={seriesList}
                        width={550}
                    />
                    <PieChart
                        title={'Orders (Nov, 2020 - Dec, 2020)'}
                        width={550}
                    />
                </div>
            </section>
        </div>
    );
};

export default AdminStats;
