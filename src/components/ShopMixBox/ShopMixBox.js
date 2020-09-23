import React, { useEffect, useState } from 'react';
import ShopFilters from '../ShopFilters/ShopFilters';
import { useHistory } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import Product from '../Product/Product';
import DataPrompt from '../DataPrompt/DataPrompt';
import MixBoxSummary from './MixBoxSummary/MixBoxSummary';
import MixBoxFilters from './MixBoxFilters/MixBoxFilters';
import ConfirmDialog from '../Dialogs/ConfirmDialog/ConfirmDialog';
import {
    errorNotification,
    infoNotification,
} from '../../utils/notification-utils';
import useCallServer from '../../hooks/useCallServer';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import useFetchMixBoxItems from '../../hooks/useFetchMixBoxItems';
import useFetchProducts from '../../hooks/useFetchProducts';
import LoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';

const queryString = require('query-string');

const ShopMixBox = ({ match, location }) => {
    let queryParams = queryString.parse(location.search);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const dispatch = useDispatch();
    const [, , , , callServer] = useCallServer();
    let { type = 'milk' } = queryParams;
    let [, myMixBox, setMyMixBox] = useFetchMixBoxItems(
        `${process.env.REACT_APP_API_ENDPOINT}/user/mixBox`
    );
    let [, mixBoxes] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=mixBox`
    );
    mixBoxes = mixBoxes && mixBoxes.products;

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
            dispatch(setLoading(true));
            callServer(
                'PUT',
                `${process.env.REACT_APP_API_ENDPOINT}/shop/mixBox/limit`,
                {
                    box_id: box._id,
                }
            )
                .then(() => {
                    setMyMixBox((prevState) => {
                        return {
                            ...prevState,
                            ...box,
                            limit: boxLimit,
                        };
                    });
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Mix box');
                    }
                })
                .finally(() => dispatch(setLoading(false)));
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
        const toggleAddButton = (value) => {
            setBars((prevState) => {
                let newState = [...prevState];
                let isFound = newState.findIndex(
                    (item) => item._id === product._id
                );
                if (isFound !== -1) {
                    newState[isFound].isAddButtonDisabled = value;
                }
                return newState;
            });
        };
        let items = [...myMixBox.items];
        if (getItemsCount() < myMixBox.limit) {
            toggleAddButton(true);
            dispatch(setLoading(true));
            callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/shop/mixBox`,
                { product_id: product._id }
            )
                .then((response) => {
                    let isProdFound = -1;
                    isProdFound = items.findIndex(
                        (item) => item._id === product._id
                    );
                    let newCount = 1;
                    if (isProdFound >= 0) {
                        newCount = items[isProdFound].count + 1;
                        items[isProdFound].count = newCount;
                        setMyMixBox((prevState) => {
                            return {
                                ...prevState,
                                items: items,
                            };
                        });
                    } else {
                        items.push({ ...product, count: 1 });
                        setMyMixBox((prevState) => {
                            return {
                                ...prevState,
                                items: items,
                            };
                        });
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        errorNotification(err.response.data.message, 'Mix box');
                    }
                })
                .finally(() => {
                    dispatch(setLoading(false));
                    toggleAddButton(false);
                });
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
        dispatch(setLoading(true));
        callServer(
            'PUT',
            `${process.env.REACT_APP_API_ENDPOINT}/shop/mixBox/clear`
        )
            .then(() => {
                setMyMixBox((prevState) => {
                    return {
                        ...prevState,
                        items: [],
                    };
                });
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(
                        err.response.data.message,
                        'Clear mix box'
                    );
                }
            })
            .finally(() => dispatch(setLoading(false)));
    };
    const updateMixBoxItems = (type, bar) => {
        if (getItemsCount() < myMixBox.limit || type === 'subtract') {
            let newCount = type === 'add' ? ++bar.count : --bar.count;
            if (newCount >= 0) {
                dispatch(setLoading(true));
                callServer(
                    'PUT',
                    `${process.env.REACT_APP_API_ENDPOINT}/shop/mixBox`,
                    { product_id: bar._id, quantity: newCount }
                )
                    .then(() => {
                        setMyMixBox((prevState) => {
                            let items = [...prevState.items];
                            let index = items.findIndex(
                                (item) => item._id === bar._id
                            );
                            items[index].count = newCount;
                            return {
                                ...prevState,
                                items: items,
                            };
                        });
                    })
                    .catch((err) => {
                        if (err.response) {
                            errorNotification(
                                err.response.data.message,
                                'Mix box'
                            );
                        }
                    })
                    .finally(() => dispatch(setLoading(false)));
            }
        } else {
            infoNotification(
                'Box is full, please upgrade your box.',
                'Box limit'
            );
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
            {myMixBox ? (
                <>
                    <div className={'shopMixBoxContainer__filtersWrapper'}>
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
                        <MixBoxSummary
                            selectedBox={myMixBox}
                            boxItems={myMixBox.items}
                            itemsCount={getItemsCount()}
                            boxLimit={myMixBox.limit}
                            handleItemUpdate={updateMixBoxItems}
                            clearMixBoxHandler={confirmClearMixBox}
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
                                            price={`EGP${product.price}`}
                                            buttonText={'Add to box'}
                                            isAddButtonDisabled={
                                                product.isAddButtonDisabled
                                            }
                                            addToBox={() =>
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
                <LoadingIndicator />
            )}
        </div>
    );
};

export default ShopMixBox;
