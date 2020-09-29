import React from 'react';
import DataPrompt from '../DataPrompt/DataPrompt';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import { useHistory } from 'react-router-dom';
const CartDropDown = ({ cart }) => {
    const history = useHistory();
    const getTotal = () => {
        let total = 0;
        cart.items.forEach((item) => {
            total += item.price * item.count;
        });
        return total;
    };
    const handleViewCart = () => {
        history.push('/cart');
    };
    return (
        <div className={'headerOuterContainer__navigationTabs__dropDownCart'}>
            <section
                className={
                    'headerOuterContainer__navigationTabs__dropDownCart__items'
                }
            >
                {cart.items.length ? (
                    cart.items.map((item) => {
                        return (
                            <div
                                key={item._id}
                                className={
                                    'headerOuterContainer__navigationTabs__dropDownCart__items__item'
                                }
                            >
                                <img src={item.images[0].url} alt={item.name} />
                                <div
                                    className={
                                        'headerOuterContainer__navigationTabs__dropDownCart__items__item__description'
                                    }
                                >
                                    <p>{item.name}</p>
                                    <p>QTY: {item.count}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <DataPrompt
                        margin={'2rem 0'}
                        message={'No items were found.'}
                    />
                )}
            </section>
            <div
                className={
                    'headerOuterContainer__navigationTabs__dropDownCart__total'
                }
            >
                <h1>Total: {getTotal()}</h1>
            </div>
            <div
                className={
                    'headerOuterContainer__navigationTabs__dropDownCart__control'
                }
            >
                <ButtonUI
                    name={'view cart'}
                    inverseBackground
                    clickHandler={handleViewCart}
                />
                <ButtonUI name={'checkout'} />
            </div>
        </div>
    );
};

export default CartDropDown;
