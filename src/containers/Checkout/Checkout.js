import React, { useState } from 'react';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import AddressComponent from '../../components/AddressComponent/AddressComponent';
import RadioButtonUi from '../../components/UI/RadioButtonUI/RadioButtonUI';
import { getTotal } from '../../utils/shop';
import useCallServer from '../../hooks/useCallServer';
import { useHistory } from 'react-router-dom';
import {
    errorNotification,
    successNotification,
} from '../../utils/notification-utils';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import { clearCart } from '../../store/actions/cart_actions';
import VerifyPhoneDialog from '../../components/Dialogs/VerifyPhoneDialog/VerifyPhoneDialog';
import { updateUser } from '../../store/actions/auth_actions';

const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const history = useHistory();
    const [, , , , callServer] = useCallServer();
    const [openPhoneDialog, setOpenPhoneDialog] = useState({
        phone: user.phone,
        canOpen: false,
    });
    const dispatch = useDispatch();
    const getDeliveryAddress = () => {
        let { addresses } = user;
        let addressesList = [...addresses];
        let isFound = addressesList.findIndex((address) => address.primary);
        return isFound >= 0 ? addressesList[isFound] : {};
    };
    const [deliveryAddress, setDeliveryAddress] = useState(
        getDeliveryAddress()
    );
    const getItemsCount = () => {
        let count = 0;
        cart.items.forEach((item) => {
            count += item.count;
        });
        return count;
    };

    const handlePlaceOrder = (promo) => {
        if (user.phone_verified) {
            dispatch(setLoading(true));
            callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/shop/order`,
                {
                    address_id: deliveryAddress._id,
                    cart: cart.items,
                    promo_code: promo,
                }
            )
                .then(() => {
                    dispatch(clearCart());
                    successNotification(
                        'Order has been placed successfully',
                        'Order'
                    );
                    history.push('/shop');
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Order');
                    }
                })
                .finally(() => dispatch(setLoading(false)));
        } else {
            setOpenPhoneDialog({
                phone: user.phone,
                canOpen: true,
            });
        }
    };
    const checkoutAddressChange = (address) => {
        setDeliveryAddress(address);
    };
    const closePhoneDialog = () => {
        setOpenPhoneDialog({
            phone: '',
            canOpen: false,
        });
    };
    const handlePhoneVerification = () => {
        closePhoneDialog();
        let newUser = { ...user };
        newUser.phone_verified = true;
        dispatch(updateUser(newUser));
    };
    return (
        <>
            <VerifyPhoneDialog
                open={openPhoneDialog.canOpen}
                phone={openPhoneDialog.phone}
                onClose={handlePhoneVerification}
                close={closePhoneDialog}
            />
            <div className={'checkoutContainer'}>
                <div className={'checkoutContainer__checkoutDataWrapper'}>
                    <AddressComponent
                        user={user}
                        margin={0}
                        addressTitle={'Delivery'}
                        background={'white'}
                        handleCheckoutAddressChange={checkoutAddressChange}
                    />
                    <div
                        className={
                            'checkoutContainer__checkoutDataWrapper__paymentMethod'
                        }
                    >
                        <p
                            className={
                                'checkoutContainer__checkoutDataWrapper__paymentMethod__title'
                            }
                        >
                            Payment method
                        </p>
                        <div
                            className={
                                'checkoutContainer__checkoutDataWrapper__paymentMethod__method'
                            }
                        >
                            <RadioButtonUi
                                value={true}
                                isChecked={true}
                                ariaLabel={'COD'}
                            />
                            <p>COD (cash on delivery)</p>
                        </div>
                    </div>
                </div>
                <OrderSummary
                    deliveryFee={
                        deliveryAddress.delivery_fees_id &&
                        deliveryAddress.delivery_fees_id.fee
                    }
                    itemsCount={getItemsCount()}
                    totalPrice={getTotal(cart.items)}
                    handleClick={handlePlaceOrder}
                    buttonName={'place order'}
                    cart={cart}
                />
            </div>
        </>
    );
};

export default Checkout;
