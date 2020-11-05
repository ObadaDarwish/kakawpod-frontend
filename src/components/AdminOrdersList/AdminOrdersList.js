import React, { useRef, useState } from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import { format } from 'date-fns';
import DataPrompt from '../DataPrompt/DataPrompt';
import AdminOrderViewDialog from '../Dialogs/AdminOrderViewDialog/AdminOrderViewDialog';
const AdminOrdersList = ({ orders, areOrdersLoading, incrementPage }) => {
    const getDate = (isoDate) => {
        const date = new Date(isoDate);
        return format(date, 'PP');
    };
    const tbodyRef = useRef();
    const [orderDialog, setOrderDialog] = useState(null);
    const handleScroll = () => {
        if (tbodyRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = tbodyRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                incrementPage();
            }
        }
    };
    const handleOpenDialog = (order) => {
        setOrderDialog(order);
    };
    const handleCloseOrderDialog = () => {
        setOrderDialog(null);
    };
    return (
        <div className={'adminOrdersContainer__ordersWrapper__orders'}>
            {orderDialog && (
                <AdminOrderViewDialog
                    open={Boolean(orderDialog)}
                    close={handleCloseOrderDialog}
                    order={orderDialog}
                />
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Total</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody onScroll={handleScroll} ref={tbodyRef}>
                    {orders.orders.length
                        ? orders.orders.map((order, index) => {
                              return (
                                  <tr key={order._id}>
                                      <th scope="row">{index + 1}</th>
                                      <td>{order.user_id.name}</td>
                                      <td>{order.total}</td>
                                      <td>{getDate(order.createdAt)}</td>
                                      <td>
                                          <ButtonUI
                                              name={'View'}
                                              clickHandler={() =>
                                                  handleOpenDialog(order)
                                              }
                                          />
                                      </td>
                                  </tr>
                              );
                          })
                        : !areOrdersLoading && (
                              <tr
                                  style={{
                                      display: 'flex',
                                  }}
                              >
                                  <td
                                      style={{
                                          display: 'flex',
                                          flexGrow: 1,
                                      }}
                                  >
                                      <DataPrompt
                                          message={'No products were found.'}
                                      />
                                  </td>
                              </tr>
                          )}
                </tbody>
            </table>
            {areOrdersLoading && (
                <div
                    className={
                        'adminOrdersContainer__ordersWrapper__orders__loadingIndication'
                    }
                >
                    <CircularLoadingIndicator height={'20rem'} />
                </div>
            )}
        </div>
    );
};

export default AdminOrdersList;
