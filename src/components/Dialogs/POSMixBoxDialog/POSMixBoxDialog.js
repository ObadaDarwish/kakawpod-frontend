import React, { useState } from 'react';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import BoxSummary from '../../BoxSummary/BoxSummary';
import useFetchProducts from '../../../hooks/useFetchProducts';
import ShopFilters from '../../ShopFilters/ShopFilters';
import PosProduct from '../../POSProduct/POSProduct';
import CircularLoadingIndicator from '../../LoadingIndicator/CircularLoadingIndicator';
import { infoNotification } from '../../../utils/notification-utils';
import { v4 as uuidv4 } from 'uuid';

const PosBoxDialog = ({ open, close, box, addToPOS }) => {
    const [type, setType] = useState('milk');
    const [localBox, setLocalBox] = useState({ items: [] });
    let [isLoadingBars, bars] = useFetchProducts(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=${
            box.category === 'mixBox' ? 'bar' : 'miniBar'
        }&type=${type}`
    );
    const getItemsCount = () => {
        let count = 0;
        localBox.items.forEach((item) => {
            if (box.category === 'mixBox') {
                count += item.count;
            } else {
                count += item.weight * item.count;
            }
        });
        return count;
    };
    const handleFilterChange = (e) => {
        const event = e.target;
        setType(event.name);
    };
    const addItem = (product) => {
        let items = [...localBox.items];
        const updateMixBoxState = (prevState) => {
            return {
                ...prevState,
                items: items,
            };
        };
        let limit = box.category === 'mixBox' ? box.limit : box.weight;
        if (getItemsCount() < limit) {
            let isProdFound = items.findIndex(
                (item) => item._id === product._id
            );
            let newCount = 1;
            if (isProdFound >= 0) {
                newCount = items[isProdFound].count + 1;
                items[isProdFound].count = newCount;
                setLocalBox((prevState) => {
                    return updateMixBoxState(prevState);
                });
            } else {
                items.push({ ...product, count: 1 });
                setLocalBox((prevState) => {
                    return updateMixBoxState(prevState);
                });
            }
        } else {
            infoNotification(
                'Box is full, please upgrade your box.',
                'Box limit'
            );
        }
    };
    const updateBoxItems = (type, bar) => {
        let limit = box.category === 'mixBox' ? box.limit : box.weight;
        if (getItemsCount() < limit || type === 'subtract') {
            let newCount = type === 'add' ? ++bar.count : --bar.count;
            setLocalBox((prevState) => {
                let items = [...prevState.items];
                let index = items.findIndex((item) => item._id === bar._id);
                if (newCount > 0) {
                    items[index].count = newCount;
                } else {
                    items.splice(index, 1);
                }
                return {
                    ...prevState,
                    items: items,
                };
            });
        } else {
            infoNotification(
                'Box is full, please upgrade your box.',
                'Box limit'
            );
        }
    };

    const clearBox = () => {
        setLocalBox((prevState) => {
            return {
                ...prevState,
                items: [],
            };
        });
    };
    const getBoxCount = (value, product) => {
        let weight = 0;
        localBox.items.forEach((item) => {
            let newCount = product._id === item._id ? value : item.count;
            weight +=
                box.category === 'mixBox' ? newCount : item.weight * newCount;
        });
        return weight;
    };
    const countInputChangeHandler = (e, item) => {
        let { value } = e.target;
        let limit = box.category === 'mixBox' ? box.limit : box.weight;
        value = value ? parseInt(value) : 0;
        if (getBoxCount(value, item) <= limit) {
            setLocalBox((prevState) => {
                let updatedItems = [...prevState.items];
                let isFound = updatedItems.findIndex(
                    (bar) => bar._id === item._id
                );
                updatedItems[isFound] = {
                    ...updatedItems[isFound],
                    count: value,
                };

                return {
                    ...prevState,
                    items: updatedItems,
                };
            });
        } else {
            infoNotification('Exceeding box limit.', 'limit');
        }
    };
    const addToPOSHandler = () => {
        let uniqueId = uuidv4();
        let finalBox = {
            ...box,
            uid: uniqueId,
            items: localBox.items,
            count: 1,
        };
        setLocalBox({ items: [] });
        addToPOS(finalBox);
    };
    return (
        <DialogWrapper open={open} close={close} onClose={clearBox}>
            <div className={'posMixBoxContainer'}>
                <ShopFilters
                    handleChange={handleFilterChange}
                    filter={type}
                    direction={'row'}
                />
                <div className={'posMixBoxContainer__wrapper'}>
                    <div className={'posMixBoxContainer__wrapper__listing'}>
                        {isLoadingBars ? (
                            <CircularLoadingIndicator height={'20rem'} />
                        ) : (
                            bars.map((bar) => {
                                return (
                                    <PosProduct
                                        addItem={addItem}
                                        product={bar}
                                        key={bar._id}
                                        noPrice
                                    />
                                );
                            })
                        )}
                    </div>
                    <BoxSummary
                        type={
                            box.category === 'mixBox' ? 'Mix box' : 'Luxury box'
                        }
                        selectedBox={box}
                        boxItems={localBox.items}
                        itemsCount={getItemsCount()}
                        boxLimit={
                            box.category === 'mixBox' ? box.limit : box.weight
                        }
                        handleItemUpdate={updateBoxItems}
                        clearBoxHandler={clearBox}
                        handleInputChange={countInputChangeHandler}
                        handleAddToCart={addToPOSHandler}
                        price={box.price}
                        buttonName={'Add'}
                    />
                </div>
            </div>
        </DialogWrapper>
    );
};

export default PosBoxDialog;
