import React, { useState } from 'react';
import ShopFilters from '../ShopFilters/ShopFilters';
import { useHistory } from 'react-router-dom';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import Product from '../Product/Product';
import DataPrompt from '../DataPrompt/DataPrompt';
import BoxSummary from '../BoxSummary/BoxSummary';
import MixBoxFilters from './MixBoxFilters/MixBoxFilters';
import ConfirmDialog from '../Dialogs/ConfirmDialog/ConfirmDialog';
import { infoNotification } from '../../utils/notification-utils';
import useFetchProducts from '../../hooks/useFetchProducts';
import LoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import { stringfyJSON } from '../../utils/jsonConversion';
import useFetchMixBox from '../../hooks/useFetchMixBox';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/cart_actions';
import { setLoading } from '../../store/actions/loadingIndicator_actions';

const queryString = require('query-string');

const ShopMixBox = ({ match, location }) => {
    let queryParams = queryString.parse(location.search);
    const dispatch = useDispatch();
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    let { type = 'milk' } = queryParams;
    let [isLoading, error, myMixBox, setMyMixBox, mixBoxes] = useFetchMixBox(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=mixBox`
    );
    let [isLoadingBars, bars, setBars] = useFetchProducts(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=bar&type=${
            type ? type : 'milk'
        }`
    );
    const history = useHistory();
    const handleFilterChange = (e) => {
        const event = e.target;
        history.push({
            pathname: match.path,
            search: `?category=bar&type=${event.name}`,
        });
    };
    const handleBoxChange = (box) => {
        let boxLimit = parseInt(box.name.substr(0, 1));
        if (getItemsCount() <= boxLimit) {
            setMyMixBox((prevState) => {
                let updatedMixBox = {
                    ...prevState,
                    ...box,
                    limit: boxLimit,
                };
                localStorage.setItem('mixBox', JSON.stringify(updatedMixBox));
                return updatedMixBox;
            });
        } else {
            infoNotification(
                `Can't downgrade, please remove extra items from box.`,
                'Box limit'
            );
        }
    };
    const getItemsCount = () => {
        let count = 0;
        myMixBox.items.forEach((item) => {
            count += item.count;
        });

        return count;
    };
    const handleAddToBox = (product) => {
        let items = [...myMixBox.items];
        const updateMixBoxState = (prevState) => {
            let updatedState = {
                ...prevState,
                items: items,
            };
            localStorage.setItem('mixBox', stringfyJSON(updatedState));
            return updatedState;
        };
        if (getItemsCount() < myMixBox.limit) {
            let isProdFound = -1;
            isProdFound = items.findIndex((item) => item._id === product._id);
            let newCount = 1;
            if (isProdFound >= 0) {
                newCount = items[isProdFound].count + 1;
                items[isProdFound].count = newCount;
                setMyMixBox((prevState) => {
                    return updateMixBoxState(prevState);
                });
            } else {
                items.push({ ...product, count: 1 });
                setMyMixBox((prevState) => {
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
    const confirmClearMixBox = () => {
        setOpenConfirmDialog(true);
    };
    const closeConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };
    const clearMixBox = () => {
        closeConfirmDialog();
        setMyMixBox((prevState) => {
            let updatedState = {
                ...prevState,
                items: [],
            };
            localStorage.setItem('mixBox', stringfyJSON(updatedState));
            return updatedState;
        });
    };
    const updateMixBoxItems = (type, bar) => {
        if (getItemsCount() < myMixBox.limit || type === 'subtract') {
            let newCount = type === 'add' ? ++bar.count : --bar.count;

            setMyMixBox((prevState) => {
                let items = [...prevState.items];
                let index = items.findIndex((item) => item._id === bar._id);
                if (newCount > 0) {
                    items[index].count = newCount;
                } else {
                    items.splice(index, 1);
                }
                let updatedState = {
                    ...prevState,
                    items: items,
                };
                localStorage.setItem('mixBox', stringfyJSON(updatedState));
                return updatedState;
            });
        } else {
            infoNotification(
                'Box is full, please upgrade your box.',
                'Box limit'
            );
        }
    };
    const addToCartHandler = () => {
        dispatch(setLoading(true));
        dispatch(addToCart(myMixBox));
        setMyMixBox((prevState) => {
            localStorage.removeItem('mixBox');
            return {
                ...prevState,
                items: [],
            };
        });
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 500);
    };
    const getBoxCount = (value, product) => {
        let weight = 0;
        myMixBox.items.forEach((item) => {
            let newCount = product._id === item._id ? value : item.count;
            weight += newCount;
        });
        return weight;
    };
    const countInputChangeHandler = (e, item) => {
        let { value } = e.target;
        value = value ? parseInt(value) : 0;
        if (getBoxCount(value, item) <= myMixBox.limit) {
            setMyMixBox((prevState) => {
                let updatedItems = [...prevState.items];
                let isFound = updatedItems.findIndex(
                    (bar) => bar._id === item._id
                );
                updatedItems[isFound] = {
                    ...updatedItems[isFound],
                    count: value,
                };

                let updatedState = {
                    ...prevState,
                    items: updatedItems,
                };
                localStorage.setItem('mixBox', stringfyJSON(updatedState));
                return updatedState;
            });
        } else {
            infoNotification('Exceeding box limit.', 'limit');
        }
    };
    return (
        <div className={'shopMixBoxContainer'}>
            <ConfirmDialog
                open={openConfirmDialog}
                checkText={'clear'}
                onClose={clearMixBox}
                close={closeConfirmDialog}
            />
            {!isLoading ? (
                <>
                    <div className={'priceTag'}>
                        <p>
                            Total EGP
                            {myMixBox.price}
                        </p>
                    </div>
                    <div className={'filtersWrapper'}>
                        <MixBoxFilters
                            mixBoxes={mixBoxes}
                            selectedBox={myMixBox}
                            handleChange={handleBoxChange}
                        />
                        <ShopFilters
                            handleChange={handleFilterChange}
                            filter={type}
                            direction={'row'}
                        />
                    </div>
                    <div
                        className={
                            'shopMixBoxContainer__boxSummaryProductsWrapper'
                        }
                    >
                        <BoxSummary
                            price={myMixBox.price}
                            type={'Mix box'}
                            selectedBox={myMixBox}
                            boxItems={myMixBox.items}
                            itemsCount={getItemsCount()}
                            boxLimit={myMixBox.limit}
                            handleItemUpdate={updateMixBoxItems}
                            clearBoxHandler={confirmClearMixBox}
                            handleInputChange={countInputChangeHandler}
                            handleAddToCart={addToCartHandler}
                        />
                        <section
                            className={
                                'shopMixBoxContainer__boxSummaryProductsWrapper__products'
                            }
                        >
                            {isLoadingBars ? (
                                <CircularLoadingIndicator height={'20rem'} />
                            ) : bars.length ? (
                                bars.map((product) => {
                                    return (
                                        <Product
                                            key={product._id}
                                            image={product.images[0].url}
                                            title={product.name}
                                            description={product.description}
                                            weight={product.weight}
                                            price={null}
                                            buttonText={'Add to box'}
                                            isAddButtonDisabled={
                                                product.isAddButtonDisabled
                                            }
                                            handleAddProduct={() =>
                                                handleAddToBox(product)
                                            }
                                        />
                                    );
                                })
                            ) : (
                                <DataPrompt
                                    message={'No products were found'}
                                />
                            )}
                        </section>
                    </div>
                </>
            ) : (
                <LoadingIndicator height={'40rem'} />
            )}
        </div>
    );
};

export default ShopMixBox;
