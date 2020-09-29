import React from 'react';
import InputUI from '../UI/InputUI/InputUI';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DataPrompt from '../DataPrompt/DataPrompt';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const CartItems = ({
    cart,
    handleInputChange,
    minusButton,
    handleDeletion,
    plusButton,
}) => {
    const matches = useMediaQuery('(max-width:1025px)');
    return (
        <div className={'cartContainer__cartWrapper__cartDetails'}>
            {!matches ? (
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
                                        <td className={'productDetailsWrapper'}>
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
                                            className={'counterControlsWrapper'}
                                        >
                                            <InputUI
                                                width={'5rem'}
                                                type={'number'}
                                                defaultValue={item.count}
                                                changeHandler={(e) =>
                                                    handleInputChange(e, item)
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
                                        <td>EGP{item.price * item.count}</td>
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
                            <td colSpan="6">
                                <DataPrompt
                                    margin={'2rem 0'}
                                    message={'No items were found.'}
                                />
                            </td>
                        )}
                    </tbody>
                </table>
            ) : (
                cart.items.map((item) => {
                    return (
                        <div className={'block'}>
                            <img src={item.images[0].url} alt={item.name} />
                            <div className={'block__details'}>
                                <p>{item.name}</p>
                                <p>{item.weight}gm</p>
                                <p>EGP{item.price}</p>
                            </div>
                            <div className={'counterControlsWrapper'}>
                                <InputUI
                                    width={'4rem'}
                                    type={'number'}
                                    defaultValue={item.count}
                                    changeHandler={(e) =>
                                        handleInputChange(e, item)
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
                                        clickHandler={() => minusButton(item)}
                                    />
                                    <ButtonUI
                                        height={'2rem'}
                                        width={'2rem'}
                                        name={'+'}
                                        clickHandler={() => plusButton(item)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default CartItems;
