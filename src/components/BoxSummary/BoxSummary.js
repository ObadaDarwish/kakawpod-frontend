import React, { useRef } from 'react';
import InputUI from '../UI/InputUI/InputUI';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import LinearProgress from '@material-ui/core/LinearProgress';
import DataPrompt from '../DataPrompt/DataPrompt';
import { useMediaQuery } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
const BoxSummary = ({
    price,
    type,
    selectedBox,
    boxItems,
    itemsCount,
    boxLimit,
    clearMixBoxHandler,
    handleItemUpdate,
}) => {
    const matches = useMediaQuery('(max-width:768px)');
    const plusButton = (bar) => {
        handleItemUpdate('add', { ...bar });
    };
    const minusButton = (bar) => {
        handleItemUpdate('subtract', { ...bar });
    };

    return (
        <section className={'boxSummary'}>
            {!matches && (
                <div className={'boxSummary__header'}>
                    <p>{type}</p>
                    <div
                        className={'boxSummary__header__clearBox'}
                        onClick={clearMixBoxHandler}
                    >
                        <DeleteOutlinedIcon
                            fontSize={'large'}
                            color={'inherit'}
                        />
                    </div>
                </div>
            )}
            <div className={'boxSummary__content'}>
                {boxItems.length ? (
                    boxItems.map((item) => {
                        return (
                            <div
                                key={item._id}
                                className={'boxSummary__content__item'}
                            >
                                <p>{item.name}</p>
                                <InputUI
                                    width={'3rem'}
                                    type={'number'}
                                    defaultValue={item.count}
                                />
                                <div
                                    className={
                                        'boxSummary__content__item__counterControls'
                                    }
                                >
                                    <ButtonUI
                                        height={'2rem'}
                                        width={'2rem'}
                                        name={'+'}
                                        clickHandler={() => plusButton(item)}
                                    />
                                    <ButtonUI
                                        height={'2rem'}
                                        width={'2rem'}
                                        name={'-'}
                                        clickHandler={() => minusButton(item)}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <DataPrompt message={'No items were added'} margin={0} />
                )}
            </div>
            <div className={'boxSummary__controlWrapper'}>
                <div className={'boxSummary__controlWrapper__progressBar'}>
                    <div
                        className={
                            'boxSummary__controlWrapper__progressBar__min'
                        }
                    >
                        <p>{`${itemsCount} ${
                            type === 'Mix box' ? 'bar(s)' : 'g'
                        }`}</p>
                    </div>
                    <LinearProgress
                        variant="determinate"
                        value={(itemsCount / boxLimit) * 100}
                    />
                    <div
                        className={
                            'boxSummary__controlWrapper__progressBar__max'
                        }
                    >
                        <p>
                            {type === 'Mix box'
                                ? selectedBox.name
                                : `${selectedBox.weight}g`}
                        </p>
                    </div>
                </div>

                <div className={'boxSummary__controlWrapper__addToCart'}>
                    <ButtonUI
                        name={`Add to cart (EGP${price})`}
                        is_disabled={itemsCount !== boxLimit}
                    />
                </div>
            </div>
        </section>
    );
};

export default BoxSummary;
