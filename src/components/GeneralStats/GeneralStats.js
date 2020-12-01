import React from 'react';
import StatBlock from '../StatBlock/StatBlock';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import GroupIcon from '@material-ui/icons/Group';
import CodeIcon from '@material-ui/icons/Code';
import LabelIcon from '@material-ui/icons/Label';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';

const GeneralStats = () => {
    const [generalStatsLoading, generalStats] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/admin/stats/general`
    );
    return generalStatsLoading && !generalStats ? (
        <CircularLoadingIndicator />
    ) : (
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
                <StatBlock amount={generalStats.orders} title={'Orders'}>
                    <LocalMallIcon fontSize={'large'} />
                </StatBlock>
                <StatBlock amount={generalStats.users} title={'Users'}>
                    <GroupIcon fontSize={'large'} />
                </StatBlock>
                <StatBlock amount={generalStats.codes} title={'Codes'}>
                    <CodeIcon fontSize={'large'} />
                </StatBlock>
                <StatBlock amount={generalStats.products} title={'Products'}>
                    <LabelIcon fontSize={'large'} />
                </StatBlock>
            </div>
        </div>
    );
};

export default GeneralStats;
