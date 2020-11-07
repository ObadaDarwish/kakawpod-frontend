import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LabelIcon from '@material-ui/icons/Label';
import HomeIcon from '@material-ui/icons/Home';
import POS from './POS/POS.js';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFooter, toggleLogo } from '../../store/actions/global_actions';
import Drawer from '@material-ui/core/Drawer';
import ListIcon from '@material-ui/icons/List';
import AdminOrders from './AdminOrders/AdminOrders';

const Admin = () => {
    const dispatch = useDispatch();
    const [drawer, setDrawer] = useState(false);
    const isAuth = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(toggleFooter(false));
        dispatch(toggleLogo(false));
        return () => {
            dispatch(toggleFooter(true));
            dispatch(toggleLogo(true));
        };
    }, []);
    const toggleDrawer = () => {
        setDrawer((prevState) => !prevState);
    };
    const itemClick = (e) => {
        toggleDrawer();
    };
    return (
        <div className={'adminContainer'}>
            <div
                className={'adminContainer__drawerIcon'}
                onClick={toggleDrawer}
            >
                <ListIcon fontSize={'large'} />
            </div>
            <Drawer anchor={'left'} open={drawer} onClose={toggleDrawer}>
                <div className={'adminContainer__navTabs'} onClick={itemClick}>
                    <NavLink
                        to={'/'}
                        className={'adminContainer__navTabs__item'}
                    >
                        <HomeIcon fontSize={'large'} />
                        <h1>Home</h1>
                    </NavLink>
                    <NavLink
                        to={'/admin/pos'}
                        className={'adminContainer__navTabs__item'}
                    >
                        <PaymentIcon fontSize={'large'} />
                        <h1>POS</h1>
                    </NavLink>
                    <NavLink
                        to={'/admin/orders'}
                        className={'adminContainer__navTabs__item'}
                    >
                        <LocalMallIcon fontSize={'large'} />
                        <h1>Orders</h1>
                    </NavLink>
                    {isAuth.authority === 1 && (
                        <>
                            <NavLink
                                to={'/admin/products'}
                                className={'adminContainer__navTabs__item'}
                            >
                                <LabelIcon fontSize={'large'} />
                                <h1>Products</h1>
                            </NavLink>
                            <NavLink
                                to={'/admin/stats'}
                                className={'adminContainer__navTabs__item'}
                            >
                                <TrendingUpIcon fontSize={'large'} />
                                <h1>Stats</h1>
                            </NavLink>
                        </>
                    )}
                </div>
            </Drawer>

            <Switch>
                <Route
                    exact
                    path={'/admin'}
                    render={() => <Redirect to={'/admin/pos'} />}
                />
                <Route path={'/admin/pos'} component={POS} />
                <Route path={'/admin/orders'} component={AdminOrders} />
                // add admin route to stats and products
            </Switch>
        </div>
    );
};

export default Admin;
