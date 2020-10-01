import React from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';

const OrderSummary = ({
    itemsCount,
    totalPrice,
    buttonName,
    handleClick,
    cart,
}) => {
    return (
        <div className={'orderSummaryWrapper'}>
            <div className={'orderSummaryWrapper__cartSummary'}>
                <h1>order summary</h1>
                <div
                    className={
                        'orderSummaryWrapper__cartSummary__sectionDetails'
                    }
                >
                    <p>Total: {itemsCount} items</p>
                    <p>EGP{totalPrice}</p>
                </div>
                <div className={'orderSummaryWrapper__cartSummary__hr'} />
                {cart && (
                    <>
                        {
                            <div
                                className={
                                    'orderSummaryWrapper__cartSummary__cartItemsWrapper'
                                }
                            >
                                {cart.items.map((item) => {
                                    return (
                                        <div
                                            key={item._id}
                                            className={
                                                'orderSummaryWrapper__cartSummary__sectionDetails'
                                            }
                                        >
                                            <p>
                                                {item.name}
                                                <br />
                                                <span
                                                    style={{
                                                        fontWeight: 'bold',
                                                        margin: '0 0.5rem',
                                                    }}
                                                >
                                                    x
                                                </span>
                                                {item.count}
                                            </p>
                                            <p>EGP{item.price * item.count}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        }
                        <div
                            className={'orderSummaryWrapper__cartSummary__hr'}
                        />
                        <div
                            className={
                                'orderSummaryWrapper__cartSummary__sectionDetails'
                            }
                        >
                            <p>Delivery fee</p>
                            <p>EGP25</p>
                        </div>
                        <div
                            className={
                                'orderSummaryWrapper__cartSummary__sectionDetails'
                            }
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            <p>GrandTotal</p>
                            <p>EGP{totalPrice + 25}</p>
                        </div>
                    </>
                )}

                <div
                    className={
                        'orderSummaryWrapper__cartSummary__checkoutWrapper'
                    }
                >
                    <ButtonUI name={buttonName} clickHandler={handleClick} />
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
