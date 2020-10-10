import React, { useRef, useState } from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import InputUI from '../UI/InputUI/InputUI';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { v4 as uuidv4 } from 'uuid';
import useCallServer from '../../hooks/useCallServer';
import {
    errorNotification,
    infoNotification,
} from '../../utils/notification-utils';

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
    const [hasDiscount, setHasDiscount] = useState(false);
    const [, , , , callServer, loadPromo, setLoadPromo] = useCallServer();
    const promoRef = useRef();
    const handleChange = (event, newExpanded) => {
        setExpanded((prevState) => (matches ? !prevState : true));
    };
    const validatePromoCode = () => {
        let promoCode = promoRef.current.value;
        if (promoCode) {
            setLoadPromo(true);
            callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/shop/promo`,
                {
                    code: promoCode,
                }
            )
                .then((response) => {
                    setHasDiscount(response.data);
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Promo');
                    }
                })
                .finally(() => setLoadPromo(false));
        } else {
            infoNotification('please add code to validate', 'Promo');
        }
    };
    const getPriceAfterDiscount = () => {
        let { percentage, max_discount } = hasDiscount;
        let waived = totalPrice * (percentage / 100);
        if (waived > max_discount) {
            waived = max_discount;
        }
        return Math.floor(totalPrice - waived);
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
                                        let KeyId = uuidv4();
                                        return (
                                            <div
                                                key={KeyId}
                                                className={
                                                    'orderSummaryWrapper__cartSummary__sectionDetails'
                                                }
                                            >
                                                <p>
                                                    {item.name}
                                                    <br />
                                                    <span
                                                        className={
                                                            'orderSummaryWrapper__cartSummary__sectionDetails__quantity'
                                                        }
                                                    >
                                                        x
                                                    </span>
                                                    {item.count}
                                                    {item.outOfStock && (
                                                        <span
                                                            className={
                                                                'orderSummaryWrapper__cartSummary__sectionDetails__outOfStock'
                                                            }
                                                        >
                                                            Out of stock
                                                        </span>
                                                    )}
                                                </p>
                                                <p>
                                                    EGP
                                                    {item.category ===
                                                    'luxuryBox'
                                                        ? item.total
                                                        : item.price *
                                                          item.count}
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
                                    <InputUI
                                        reference={promoRef}
                                        label={'promo code'}
                                    />
                                    <ButtonUI
                                        name={'apply'}
                                        width={'9rem'}
                                        is_disabled={loadPromo}
                                        clickHandler={validatePromoCode}
                                    />
                                </div>
                            </>
                        )}

                        <div
                            className={
                                'orderSummaryWrapper__cartSummary__sectionDetails'
                            }
                        >
                            <p>Total: {itemsCount} items</p>
                            {hasDiscount && (
                                <p
                                    className={
                                        'orderSummaryWrapper__cartSummary__sectionDetails__discount'
                                    }
                                >
                                    EGP{getPriceAfterDiscount()}
                                </p>
                            )}

                            <p>
                                {hasDiscount && (
                                    <span
                                        className={
                                            'orderSummaryWrapper__cartSummary__sectionDetails__discountWaiver'
                                        }
                                    />
                                )}
                                EGP{totalPrice}
                            </p>
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
                                    <p>
                                        EGP
                                        {(hasDiscount
                                            ? getPriceAfterDiscount()
                                            : totalPrice) + deliveryFee}
                                    </p>
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
                                clickHandler={() => {
                                    let promoCode = null;
                                    if (promoRef.current) {
                                        promoCode = promoRef.current.value;
                                    }
                                    handleClick(promoCode);
                                }}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default OrderSummary;
