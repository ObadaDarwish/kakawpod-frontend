import React, { useState } from 'react';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { useSelector } from 'react-redux';
import AddressComponent from '../../components/AddressComponent/AddressComponent';
import RadioButtonUi from '../../components/UI/RadioButtonUI/RadioButtonUI';
import { getTotal } from '../../utils/shop';

const Checkout = () => {
    window.scroll(0, 0);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const getDeliveryFee = () => {
        let { addresses } = user;
        let addressesList = [...addresses];
        let isFound = addressesList.findIndex((address) => address.primary);
        return addressesList[isFound].delivery_fees_id.fee;
    };
    const [deliveryFee, setDeliveryFee] = useState(getDeliveryFee());
    const getItemsCount = () => {
        let count = 0;
        cart.items.forEach((item) => {
            count += item.count;
        });
        return count;
    };

    const handlePlaceOrder = () => {};
    const checkoutAddressChange = (address) => {
        setDeliveryFee(address.delivery_fees_id.fee);
    };
    return (
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
                deliveryFee={deliveryFee}
                itemsCount={getItemsCount()}
                totalPrice={getTotal(cart.items)}
                handleClick={handlePlaceOrder}
                buttonName={'place order'}
                cart={cart}
            />
        </div>
    );
};

export default Checkout;
