import React from 'react';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { useSelector } from 'react-redux';
import AddressComponent from '../../components/AddressComponent/AddressComponent';
import RadioButtonUi from '../../components/UI/RadioButtonUI/RadioButtonUI';

const Checkout = () => {
    window.scroll(0, 0);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const getItemsCount = () => {
        let count = 0;
        cart.items.forEach((item) => {
            count += item.count;
        });
        return count;
    };
    const getTotalPrice = () => {
        let total = 0;
        cart.items.forEach((item) => {
            total += item.price * item.count;
        });
        return total;
    };
    const handlePlaceOrder = () => {};
    return (
        <div className={'checkoutContainer'}>
            <div className={'checkoutContainer__checkoutDataWrapper'}>
                <AddressComponent
                    user={user}
                    margin={0}
                    addressTitle={'Delivery'}
                    background={'white'}
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
                itemsCount={getItemsCount()}
                totalPrice={getTotalPrice()}
                handleClick={handlePlaceOrder}
                buttonName={'place order'}
                cart={cart}
            />
        </div>
    );
};

export default Checkout;
