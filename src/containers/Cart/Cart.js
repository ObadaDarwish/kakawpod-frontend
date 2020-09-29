import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputUI from '../../components/UI/InputUI/InputUI';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ButtonUI from '../../components/UI/ButtonUI/ButtonUI';
import { removeFromCart, updateCart } from '../../store/actions/cart_actions';
import { infoNotification } from '../../utils/notification-utils';
import DataPrompt from '../../components/DataPrompt/DataPrompt';
import { useHistory } from 'react-router';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { NavLink } from 'react-router-dom';
const Cart = () => {
    window.scroll(0, 0);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();
    const updateState = (newValue, item) => {
        if (newValue <= 20 && newValue > 0) {
            dispatch(updateCart(item));
        } else {
            infoNotification('Min QTY: 1, Max QTY:20', 'Limit');
        }
    };
    const handleInputChange = (e, item) => {
        let { value } = e.target;
        let newItem = { ...item };
        let newValue = value ? parseInt(value) : 1;
        newItem.count = newValue;
        updateState(newValue, newItem);
    };
    const handleItemUpdate = (type, item) => {
        item.count = type === 'add' ? ++item.count : --item.count;
        updateState(item.count, item);
    };
    const plusButton = (item) => {
        handleItemUpdate('add', { ...item });
    };
    const minusButton = (item) => {
        handleItemUpdate('subtract', { ...item });
    };
    const handleDeletion = (item) => {
        dispatch(removeFromCart(item));
    };
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
    const handleCheckout = () => {
        if (cart.items.length) {
            history.push('/checkout');
        } else {
            infoNotification(
                'cart is empty, please add items in cart to checkout',
                'checkout'
            );
        }
    };
    return (
        <div className={'cartContainer'}>
            <h1 className={'cartContainer__title'}>Shopping cart</h1>
            <section className={'cartContainer__cartWrapper'}>
                <div className={'cartContainer__cartWrapper__cartDetails'}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">product</th>
                                <th scope="col">QTY</th>
                                <th scope="col">price</th>
                                <th scope="col">total</th>
                                <th scope="col">remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.length ? (
                                cart.items.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td
                                                className={
                                                    'productDetailsWrapper'
                                                }
                                            >
                                                <img
                                                    src={item.images[0].url}
                                                    alt={item.name}
                                                />
                                                <div className={'details'}>
                                                    <p>{item.name}</p>
                                                    <p>{item.weight}gm</p>
                                                </div>
                                            </td>
                                            <td
                                                className={
                                                    'counterControlsWrapper'
                                                }
                                            >
                                                <InputUI
                                                    width={'5rem'}
                                                    type={'number'}
                                                    defaultValue={item.count}
                                                    changeHandler={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            item
                                                        )
                                                    }
                                                />
                                                <div
                                                    className={
                                                        'counterControlsWrapper__counterControls'
                                                    }
                                                >
                                                    <ButtonUI
                                                        height={'2rem'}
                                                        width={'2rem'}
                                                        name={'-'}
                                                        clickHandler={() =>
                                                            minusButton(item)
                                                        }
                                                    />
                                                    <ButtonUI
                                                        height={'2rem'}
                                                        width={'2rem'}
                                                        name={'+'}
                                                        clickHandler={() =>
                                                            plusButton(item)
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td>EGP{item.price}</td>
                                            <td>
                                                EGP{item.price * item.count}
                                            </td>
                                            <td className={'deletionIcon'}>
                                                <DeleteOutlinedIcon
                                                    fontSize={'large'}
                                                    color={'inherit'}
                                                    onClick={() =>
                                                        handleDeletion(item)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <td colspan="6">
                                    <DataPrompt
                                        margin={'2rem 0'}
                                        message={'No items were found.'}
                                    />
                                </td>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={'orderSummaryWrapper'}>
                    <div className={'orderSummaryWrapper__cartSummary'}>
                        <h1>order summary</h1>
                        <div
                            className={
                                'orderSummaryWrapper__cartSummary__sectionDetails'
                            }
                        >
                            <p>{getItemsCount()} items</p>
                            <p>EGP{getTotalPrice()}</p>
                        </div>
                        <div
                            className={'orderSummaryWrapper__cartSummary__hr'}
                        />
                        <div
                            className={
                                'orderSummaryWrapper__cartSummary__checkoutWrapper'
                            }
                        >
                            <ButtonUI
                                name={'checkout'}
                                clickHandler={handleCheckout}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className={'cartContainer__continueShopping'}>
                <KeyboardArrowLeftIcon fontSize={'large'} />
                <NavLink to={'/shop'}>Continue shopping</NavLink>
            </div>
        </div>
    );
};

export default Cart;
