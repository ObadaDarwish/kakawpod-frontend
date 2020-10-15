import React from 'react';
import InputUI from '../UI/InputUI/InputUI';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DataPrompt from '../DataPrompt/DataPrompt';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { v4 as uuidv4 } from 'uuid';
const CartItems = ({
    cart,
    handleInputChange,
    minusButton,
    handleDeletion,
    plusButton,
}) => {
    const matches = useMediaQuery('(max-width:1380px)');
    const tableItem = (item, keyId) => {
        return (
            <tr key={keyId}>
                <td className={'productDetailsWrapper'}>
                    <img src={item.images[0].url} alt={item.name} />
                    <div className={'details'}>
                        <p>{item.name}</p>
                        {item.items && item.items.length ? (
                            item.items.map((sub_item) => {
                                let subKeyId = uuidv4();
                                return (
                                    <span key={subKeyId}>
                                        {sub_item.name} X{sub_item.count}
                                    </span>
                                );
                            })
                        ) : (
                            <p>{item.weight}gm</p>
                        )}
                    </div>
                </td>
                <td className={'counterControlsWrapper'}>
                    <InputUI
                        width={'5rem'}
                        type={'number'}
                        value={item.count}
                        changeHandler={(e) => handleInputChange(e, item)}
                    />
                    <div className={'counterControlsWrapper__counterControls'}>
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
                </td>
                <td>EGP{item.price}</td>
                <td>
                    EGP
                    {item.category === 'luxuryBox'
                        ? item.total
                        : item.price * item.count}
                </td>
                <td className={'deletionIcon'}>
                    <DeleteOutlinedIcon
                        fontSize={'large'}
                        color={'inherit'}
                        onClick={() => handleDeletion(item)}
                    />
                </td>
            </tr>
        );
    };
    const mobileViewItem = (item, keyId) => {
        return (
            <div className={'block'} key={keyId}>
                <img src={item.images[0].url} alt={item.name} />
                <div className={'block__details'}>
                    <p>{item.name}</p>
                    {item.items && item.items.length ? (
                        <div className={'block__details__subItemsWrapper'}>
                            {item.items.map((sub_item) => {
                                let subKeyId = uuidv4();
                                return (
                                    <p
                                        key={subKeyId}
                                        className={
                                            'block__details__subItemsWrapper__subItem'
                                        }
                                    >
                                        {sub_item.name} <br /> X{sub_item.count}
                                    </p>
                                );
                            })}
                        </div>
                    ) : (
                        <p>{item.weight}gm</p>
                    )}

                    <p>
                        EGP
                        {item.category === 'luxuryBox'
                            ? item.total
                            : item.price * item.count}
                    </p>
                </div>
                <div className={'counterControlsWrapper'}>
                    <InputUI
                        width={'4rem'}
                        type={'number'}
                        value={item.count}
                        changeHandler={(e) => handleInputChange(e, item)}
                    />
                    <div className={'counterControlsWrapper__counterControls'}>
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
    };
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
                                let keyId = uuidv4();
                                return tableItem(item, keyId);
                            })
                        ) : (
                            <tr>
                                <td colSpan="6">
                                    <DataPrompt
                                        margin={'2rem 0'}
                                        message={'No items were found.'}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : cart.items.length ? (
                cart.items.map((item) => {
                    let keyId = uuidv4();
                    return mobileViewItem(item, keyId);
                })
            ) : (
                <DataPrompt
                    margin={'2rem 0'}
                    message={'No items were found.'}
                />
            )}
        </div>
    );
};

export default CartItems;
