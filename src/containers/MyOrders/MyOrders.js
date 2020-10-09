import React from 'react';
import Order from '../../components/Order/Order';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../../components/LoadingIndicator/CircularLoadingIndicator';
import DataPrompt from '../../components/DataPrompt/DataPrompt';
import { useSelector } from 'react-redux';

const MyOrders = () => {
    const user = useSelector((state) => state.user);
    const [isLoading, data] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/user/orders`
    );
    return (
        <div className={'myOrdersContainer'}>
            <h1 className={'myOrdersContainer__title'}>my orders</h1>
            {isLoading ? (
                <CircularLoadingIndicator height={'40rem'} />
            ) : data.orders.length ? (
                data.orders.map((order) => {
                    return <Order key={order._id} order={order} user={user} />;
                })
            ) : (
                <DataPrompt message={'No orders found.'} />
            )}
        </div>
    );
};

export default MyOrders;
