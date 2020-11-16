import React from 'react';
import InputUI from '../UI/InputUI/InputUI';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DataPrompt from '../DataPrompt/DataPrompt';
import { v4 as uuidv4 } from 'uuid';
const CartItems = ({
    cart,
    handleInputChange,
    minusButton,
    handleDeletion,
    plusButton,
}) => {
    const mobileViewItem = (item, keyId) => {
        return (
            <div className={'block'} key={keyId}>
                <div className={'block__removeIcon'}>
                    <DeleteOutlinedIcon
                        fontSize={'large'}
                        color={'inherit'}
                        onClick={() => handleDeletion(item)}
                    />
                </div>
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

                    <div className={'block__details__priceWrapper'}>
                        <p>
                            total: EGP
                            {(item.category === 'luxuryBox'
                                ? item.total
                                : item.price) * item.count}
                        </p>
                    </div>
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
            {cart.items.length ? (
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
