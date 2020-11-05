import React from 'react';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import SelectUi from '../../UI/SelectUI/SelectUI';

const AdminOrderViewDialog = ({ open, onClose, close, loading, order }) => {
    return (
        <DialogWrapper
            open={open}
            onClose={onClose}
            close={close}
            loading={loading}
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
                        value={order.status}
                        list={[
                            'pending',
                            'out for delivery',
                            'delivered',
                            'canceled',
                            'completed',
                        ]}
                    />
                    <ButtonUI name={'save'} />
                </section>
            </div>
        </DialogWrapper>
    );
};

export default AdminOrderViewDialog;
