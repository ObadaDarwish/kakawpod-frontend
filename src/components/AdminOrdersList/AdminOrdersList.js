import React, { useRef } from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import { format } from 'date-fns';
import DataPrompt from '../DataPrompt/DataPrompt';
const AdminOrdersList = ({ orders, loading, incrementPage }) => {
    const getDate = (isoDate) => {
        const date = new Date(isoDate);
        return format(date, 'PP');
    };
    const tbodyRef = useRef();
    const handleScroll = () => {
        if (tbodyRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = tbodyRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                incrementPage();
            }
        }
    };
    return (
        <div className={'adminOrdersContainer__ordersWrapper__orders'}>
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
                                          <ButtonUI name={'View'} />
                                      </td>
                                  </tr>
                              );
                          })
                        : !loading && (
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
                    {loading && (
                        <tr
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <td>
                                <CircularLoadingIndicator height={'20rem'} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrdersList;
