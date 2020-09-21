import React from 'react';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import LinearProgress from '@material-ui/core/LinearProgress';
import DataPrompt from '../../DataPrompt/DataPrompt';

const MixBoxSummary = ({ selectedBox, boxItems, itemsCount, boxLimit }) => {
    return (
        <section
            className={
                'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary'
            }
        >
            <div
                className={
                    'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary__header'
                }
            >
                <p>Content</p>
            </div>
            <div
                className={
                    'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary__content'
                }
            >
                {boxItems.length ? (
                    boxItems.map((item) => {
                        return (
                            <div
                                key={item._id}
                                className={
                                    'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary__content__item'
                                }
                            >
                                <p>{item.name}</p>
                                <InputUI
                                    width={'3rem'}
                                    type={'number'}
                                    defaultValue={item.count}
                                />
                                <div
                                    className={
                                        'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary__content__item__counterControls'
                                    }
                                >
                                    <ButtonUI
                                        height={'2rem'}
                                        width={'2rem'}
                                        name={'+'}
                                    />
                                    <ButtonUI
                                        height={'2rem'}
                                        width={'2rem'}
                                        name={'-'}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <DataPrompt message={'No items were added'} margin={0} />
                )}
            </div>
            <div
                className={
                    'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary__controlWrapper'
                }
            >
                <div
                    className={
                        'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary__controlWrapper__progressBar'
                    }
                >
                    <div
                        className={
                            'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary__controlWrapper__progressBar__min'
                        }
                    >
                        <p>{`${itemsCount} bar${itemsCount > 1 ? 's' : ''}`}</p>
                    </div>
                    <LinearProgress
                        variant="determinate"
                        value={(itemsCount / boxLimit) * 100}
                    />
                    <div
                        className={
                            'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary__controlWrapper__progressBar__max'
                        }
                    >
                        <p>{selectedBox.name}</p>
                    </div>
                </div>
                <div
                    className={
                        'shopMixBoxContainer__boxSummaryProductsWrapper__mixBoxSummary__controlWrapper__addToCart'
                    }
                >
                    <ButtonUI
                        name={'Add to cart'}
                        is_disabled={itemsCount !== boxLimit}
                    />
                </div>
            </div>
        </section>
    );
};

export default MixBoxSummary;
