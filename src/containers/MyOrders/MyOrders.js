import React, { useState } from 'react';
import Order from '../../components/Order/Order';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../../components/LoadingIndicator/CircularLoadingIndicator';
import DataPrompt from '../../components/DataPrompt/DataPrompt';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../components/Dialogs/ConfirmDialog/ConfirmDialog';
import useCallServer from '../../hooks/useCallServer';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import {
    errorNotification,
    successNotification,
} from '../../utils/notification-utils';

const MyOrders = () => {
    const user = useSelector((state) => state.user);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedOrder, setselectedOrder] = useState();
    const dispatch = useDispatch();
    const [, , , , callServer] = useCallServer();
    const [isLoading, data, setData] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/user/orders`
    );
    const closeConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };
    const cancelOrder = () => {
        dispatch(setLoading(true));
        callServer('PUT', `${process.env.REACT_APP_API_ENDPOINT}/user/order`, {
            order_id: selectedOrder._id,
        })
            .then(() => {
                setOpenConfirmDialog(false);
                setData((prevState) => {
                    let updatedOrders = [...prevState.orders];
                    let isOrderFound = updatedOrders.findIndex(
                        (item) => item._id === selectedOrder._id
                    );
                    if (isOrderFound >= 0) {
                        updatedOrders[isOrderFound].status = 'cancelled';
                    }
                    return {
                        ...prevState,
                        orders: updatedOrders,
                    };
                });
                successNotification('order cancelled successfully', 'Order');
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Order');
                }
            })
            .finally(() => dispatch(setLoading(false)));
    };
    const confirmCancelOrder = (order) => {
        setselectedOrder(order);
        setOpenConfirmDialog(true);
    };
    return (
        <div className={'myOrdersContainer'}>
            <ConfirmDialog
                open={openConfirmDialog}
                checkText={'cancel'}
                onClose={cancelOrder}
                close={closeConfirmDialog}
            />
            <h1 className={'myOrdersContainer__title'}>my orders</h1>
            {isLoading ? (
                <CircularLoadingIndicator height={'40rem'} />
            ) : data.orders.length ? (
                data.orders.map((order) => {
                    return (
                        <Order
                            key={order._id}
                            order={order}
                            user={user}
                            handleCancelOrder={confirmCancelOrder}
                        />
                    );
                })
            ) : (
                <DataPrompt message={'No orders found.'} />
            )}
        </div>
    );
};

export default MyOrders;
