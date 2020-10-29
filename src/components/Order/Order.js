import React from 'react';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PaymentIcon from '@material-ui/icons/Payment';
import PersonIcon from '@material-ui/icons/Person';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
const moment = require('moment');
const Order = ({ order, user, handleCancelOrder }) => {
    const getStatusColor = (status) => {
        let color = 'red';
        switch (status) {
            case 'pending':
                color = '#fba810';
                break;
            case 'out for delivery':
                color = '#77a9fb';
                break;
            case 'delivered':
                color = '#00fb4c';
                break;
            case 'cancelled':
                color = '#ee4543';
                break;
            default:
                color = 'red';
        }

        return color;
    };
    return (
        <div className={'orderWrapper'}>
            <section className={'orderWrapper__orderHeader'}>
                <div className={'orderWrapper__orderInfoSection'}>
                    <p>
                        <CalendarTodayIcon fontSize={'large'} />
                        Order date
                    </p>
                    <p>{moment(order.createdAt).format('LL')}</p>
                </div>
                <div className={'orderWrapper__orderInfoSection'}>
                    <p>
                        <PaymentIcon fontSize={'large'} />
                        Total
                    </p>
                    <p>EGP{order.total}</p>
                </div>
                <div className={'orderWrapper__orderInfoSection'}>
                    <p>
                        <PersonIcon fontSize={'large'} />
                        Owner
                    </p>
                    <p>{user.name}</p>
                </div>
                <div className={'orderWrapper__orderInfoSection'}>
                    <p>
                        <LocalOfferIcon fontSize={'large'} />
                        Order id
                    </p>
                    <p>{order.order_id}</p>
                </div>
            </section>
            <section className={'orderWrapper__orderStatus'}>
                <section className={'orderWrapper__orderInfoSection'}>
                    <p>
                        <LocalMallIcon fontSize={'large'} />
                        arriving on
                    </p>
                    <p>
                        {moment
                            .unix(moment(order.createdAt).unix() + 259200)
                            .format('LL')}
                    </p>
                </section>
                <section className={'orderWrapper__orderInfoSection'}>
                    <p>status</p>
                    <p>
                        <FiberManualRecordIcon
                            fontSize={'large'}
                            style={{ color: getStatusColor(order.status) }}
                        />
                        {order.status}
                    </p>
                </section>
            </section>
            <section className={'orderWrapper__orderItems'}>
                <h1 className={'orderWrapper__orderItems__title'}>Details</h1>
                <ul className={'orderWrapper__orderItems__itemsWrapper'}>
                    {order.items.map((item) => {
                        return (
                            <li
                                key={item._id}
                                className={
                                    'orderWrapper__orderItems__itemsWrapper__item'
                                }
                            >
                                <p>
                                    * {item.item_id.name}
                                    <span>X {item.quantity}</span>
                                </p>
                                {item.sub_items && (
                                    <ul
                                        className={
                                            'orderWrapper__orderItems__itemsWrapper__item__subItemWrapper'
                                        }
                                    >
                                        {item.sub_items.map((subItem) => {
                                            return (
                                                <li key={subItem._id}>
                                                    <p>
                                                        {
                                                            subItem.sub_item_id
                                                                .name
                                                        }
                                                        <span>
                                                            X {subItem.quantity}
                                                        </span>
                                                    </p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
                {order.status === 'pending' && (
                    <div className={'orderWrapper__orderItems__control'}>
                        <ButtonUI
                            name={'cancel'}
                            clickHandler={() => handleCancelOrder(order)}
                        />
                    </div>
                )}
            </section>
        </div>
    );
};

export default Order;
