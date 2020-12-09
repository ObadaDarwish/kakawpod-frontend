import React from 'react';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import StatBlock from '../StatBlock/StatBlock';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import GroupIcon from '@material-ui/icons/Group';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CodeIcon from '@material-ui/icons/Code';
import DataPrompt from '../DataPrompt/DataPrompt';
import useFetchData from '../../hooks/useFetchData';

const DailyStats = ({ startDate, endDate }) => {
    const [dailyStatsLoading, dailyStats] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/admin/stats/daily?${
            startDate ? '&startDate=' + startDate : ''
        }${endDate ? '&endDate=' + endDate : ''}`
    );

    return dailyStatsLoading ? (
        <CircularLoadingIndicator height={'45rem'} />
    ) : dailyStats.length > 0 ? (
        <div
            className={
                'adminStatsContainer__bottomSection__topBlock__dailyStatsWrapper'
            }
        >
            <div
                className={
                    'adminStatsContainer__bottomSection__topBlock__dailyStatsWrapper__statsBlockWrapper'
                }
            >
                <StatBlock
                    background={'#7D5A5A'}
                    color={'#fff'}
                    amount={`EGP${dailyStats[0].revenue}`}
                    title={'Revenue'}
                >
                    <AttachMoneyIcon fontSize={'large'} />
                </StatBlock>
                <StatBlock
                    amount={`EGP${dailyStats[0].discounts}`}
                    title={'Discounts'}
                >
                    <MoneyOffIcon fontSize={'large'} />
                </StatBlock>
                <StatBlock amount={`EGP${dailyStats[0].users}`} title={'Users'}>
                    <GroupIcon fontSize={'large'} />
                </StatBlock>
                <StatBlock amount={dailyStats[0].codes} title={'Codes'}>
                    <CodeIcon fontSize={'large'} />
                </StatBlock>
            </div>
            <div className={'blockGroup'}>
                <div className={'blockGroup__groupData'}>
                    <p>
                        {dailyStats[0].shop_orders +
                            dailyStats[0].online_orders}
                    </p>
                    <p>Orders</p>
                </div>
                <div className={'blockGroup__subStats'}>
                    <StatBlock
                        amount={dailyStats[0].shop_orders}
                        title={'Shop orders'}
                    >
                        <StoreIcon fontSize={'large'} />
                    </StatBlock>
                    <StatBlock
                        amount={dailyStats[0].online_orders}
                        title={'Online orders'}
                    >
                        <ShoppingCartIcon fontSize={'large'} />
                    </StatBlock>
                </div>
            </div>
        </div>
    ) : (
        <DataPrompt message={'No Daily Stats yet.'} margin={'10rem'} />
    );
};

export default DailyStats;
