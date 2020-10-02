import React, { useState } from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import InputUI from '../UI/InputUI/InputUI';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';
const OrderSummary = ({
    deliveryFee,
    itemsCount,
    totalPrice,
    buttonName,
    handleClick,
    cart,
}) => {
    const matches = useMediaQuery('(max-width:768px)');
    const [expanded, setExpanded] = useState(true);
    const handleChange = (event, newExpanded) => {
        setExpanded((prevState) => (matches ? !prevState : true));
    };
    return (
        <div className={'orderSummaryWrapper'}>
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h1>Order summary</h1>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={'orderSummaryWrapper__cartSummary'}>
                        {cart && (
                            <>
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
                                                <p>
                                                    EGP{item.price * item.count}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
                                    className={
                                        'orderSummaryWrapper__cartSummary__promoWrapper'
                                    }
                                >
                                    <InputUI label={'promo code'} />
                                    <ButtonUI name={'apply'} width={'9rem'} />
                                </div>
                            </>
                        )}

                        <div
                            className={
                                'orderSummaryWrapper__cartSummary__sectionDetails'
                            }
                        >
                            <p>Total: {itemsCount} items</p>
                            <p>EGP{totalPrice}</p>
                        </div>
                        <div
                            className={'orderSummaryWrapper__cartSummary__hr'}
                        />
                        {cart && (
                            <>
                                <div
                                    className={
                                        'orderSummaryWrapper__cartSummary__sectionDetails'
                                    }
                                >
                                    <p>Delivery fee</p>
                                    <p>EGP{deliveryFee}</p>
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
                                    <p>EGP{totalPrice + deliveryFee}</p>
                                </div>
                            </>
                        )}

                        <div
                            className={
                                'orderSummaryWrapper__cartSummary__checkoutWrapper'
                            }
                        >
                            <ButtonUI
                                name={buttonName}
                                clickHandler={handleClick}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default OrderSummary;
