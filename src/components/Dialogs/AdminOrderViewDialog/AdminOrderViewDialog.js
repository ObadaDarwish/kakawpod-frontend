import React, { useRef, useState } from 'react';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import SelectUi from '../../UI/SelectUI/SelectUI';
import useCallServer from '../../../hooks/useCallServer';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';
import InputUI from '../../UI/InputUI/InputUI';
import { useSelector } from 'react-redux';

const AdminOrderViewDialog = ({ open, onClose, close, order }) => {
    const [status, setStatus] = useState(order.status);
    const isAuth = useSelector((state) => state.user);
    const [showOTPButton, setshowOTPButton] = useState(true);
    const [, , , , callServer, isLoading, setLoading] = useCallServer();
    const OTPRef = useRef();
    const statusChange = (e) => {
        const { value } = e.target;
        setStatus(value);
    };
    const saveStatusChange = () => {
        const changeStatus = (OTP) => {
            setLoading(true);
            callServer(
                'PUT',
                `${process.env.REACT_APP_API_ENDPOINT}/admin/order/${order._id}`,
                {
                    order_status: status,
                    OTP: OTP,
                }
            )
                .then((response) => {
                    onClose(order._id);
                    successNotification(
                        `order status has been successfully changed to ${status}`,
                        'Order'
                    );
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Order');
                        setLoading(false);
                    }
                });
        };
        if (canShowOTP()) {
            changeStatus(OTPRef.current.value);
        } else {
            changeStatus();
        }
    };
    const canShowOTP = () => {
        let canShow = false;
        if (isAuth.authority === 2) {
            if (status !== 'out for delivery' && status !== 'delivered') {
                canShow = true;
            }
        }
        return canShow;
    };
    const requestOTP = () => {
        setLoading(true);
        callServer('POST', `${process.env.REACT_APP_API_ENDPOINT}/admin/OTP`, {
            percentage: 0,
        })
            .then(() => {
                setshowOTPButton(false);
                successNotification(
                    'OTP has been send successfully',
                    'Discount'
                );
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(err.response.data.message, 'Code');
                }
            })
            .finally(() => setLoading(false));
    };
    return (
        <DialogWrapper
            open={open}
            onClose={onClose}
            close={close}
            loading={isLoading}
        >
            <div className={'viewOrderContainer'}>
                <section className={'viewOrderContainer__userSection'}>
                    <p> {order.user_id.name}</p>
                    <p> {order.user_id.phone}</p>
                    <p> {order.user_id.email}</p>
                </section>
                <section className={'viewOrderContainer__itemsSection'}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => {
                                return (
                                    <tr key={item.item_id._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td className={'product_name'}>
                                            <p>{item.item_id.name}</p>
                                            {item.sub_items.length ? (
                                                <ul>
                                                    {item.sub_items.map(
                                                        (sub_item) => {
                                                            return (
                                                                <li
                                                                    key={
                                                                        sub_item
                                                                            .sub_item_id
                                                                            ._id
                                                                    }
                                                                >
                                                                    <p>
                                                                        {
                                                                            sub_item
                                                                                .sub_item_id
                                                                                .name
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            sub_item.quantity
                                                                        }
                                                                    </p>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            ) : (
                                                ''
                                            )}
                                        </td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
                <section className={'viewOrderContainer__statusControl'}>
                    <SelectUi
                        label={'status'}
                        value={status}
                        handleChange={statusChange}
                        list={[
                            'pending',
                            'out for delivery',
                            'delivered',
                            'canceled',
                            'completed',
                        ]}
                    />
                    {canShowOTP() && !showOTPButton && (
                        <InputUI label={'OTP'} reference={OTPRef} />
                    )}
                    {canShowOTP() && showOTPButton ? (
                        <ButtonUI
                            name={'request otp'}
                            clickHandler={requestOTP}
                        />
                    ) : (
                        <ButtonUI
                            name={'save'}
                            clickHandler={saveStatusChange}
                        />
                    )}
                </section>
            </div>
        </DialogWrapper>
    );
};

export default AdminOrderViewDialog;
