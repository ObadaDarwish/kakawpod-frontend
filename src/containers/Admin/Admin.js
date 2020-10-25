import React, { useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LabelIcon from '@material-ui/icons/Label';
import POS from './POS/POS.js';
import { useDispatch } from 'react-redux';
import { toggleFooter } from '../../store/actions/global_actions';

const Admin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleFooter(false));
        return () => {
            dispatch(toggleFooter(true));
        };
    }, []);
    return (
        <div className={'adminContainer'}>
            <div className={'adminContainer__sideMenu'}>
                <NavLink
                    to={'/admin/pos'}
                    className={'adminContainer__sideMenu__item'}
                >
                    <PaymentIcon fontSize={'large'} />
                    <h1>POS</h1>
                </NavLink>
                <NavLink
                    to={'/admin/orders'}
                    className={'adminContainer__sideMenu__item'}
                >
                    <LocalMallIcon fontSize={'large'} />
                    <h1>Orders</h1>
                </NavLink>
                <NavLink
                    to={'/admin/products'}
                    className={'adminContainer__sideMenu__item'}
                >
                    <LabelIcon fontSize={'large'} />
                    <h1>Products</h1>
                </NavLink>
                <NavLink
                    to={'/admin/stats'}
                    className={'adminContainer__sideMenu__item'}
                >
                    <TrendingUpIcon fontSize={'large'} />
                    <h1>Stats</h1>
                </NavLink>
            </div>
            <Switch>
                <Route path={'/admin/pos'} component={POS} />
            </Switch>
        </div>
    );
};

export default Admin;
