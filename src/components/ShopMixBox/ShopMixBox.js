import React, { useEffect, useState } from 'react';
import ShopFilters from '../ShopFilters/ShopFilters';
import { useHistory } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import Product from '../Product/Product';
import DataPrompt from '../DataPrompt/DataPrompt';
import MixBoxSummary from './MixBoxSummary/MixBoxSummary';
import MixBoxFilters from './MixBoxFilters/MixBoxFilters';
import {
    errorNotification,
    infoNotification,
} from '../../utils/notification-utils';
import useCallServer from '../../hooks/useCallServer';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import useFetchMixBoxItems from '../../hooks/useFetchMixBoxItems';
import useFetchProducts from '../../hooks/useFetchProducts';

const queryString = require('query-string');

const ShopMixBox = ({ match, location }) => {
    let queryParams = queryString.parse(location.search);
    const dispatch = useDispatch();
    const [, , , , callServer] = useCallServer();
    let { type = 'milk' } = queryParams;
    let [, mixBoxItems, setMixBoxItems] = useFetchMixBoxItems(
        `${process.env.REACT_APP_API_ENDPOINT}/user/mixBox`
    );
    let [, mixBoxes] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=mixBox`
    );
    mixBoxes = mixBoxes && mixBoxes.products;
    const [selectedBox, setSelectedBox] = useState(
        mixBoxes ? mixBoxes[0] : { name: '3 bars', _id: 0 }
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
            setSelectedBox(box);
        } else {
            infoNotification(
                `Can't downgrade, please remove extra items from box.`,
                'Box limit'
            );
        }
    };
    const getItemsCount = () => {
        let count = 0;
        mixBoxItems.forEach((item) => {
            count += item.count;
        });

        return count;
    };
    const getBoxLimit = () => {
        return parseInt(selectedBox.name.substr(0, 1));
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
        let items = [...mixBoxItems];
        if (getItemsCount() < getBoxLimit()) {
            toggleAddButton(true);
            dispatch(setLoading(true));
            callServer(
                'POST',
                `${process.env.REACT_APP_API_ENDPOINT}/shop/mixBox`,
                { product_id: product._id }
            )
                .then((response) => {
                    console.log(response);
                    let isProdFound = -1;
                    isProdFound = items.findIndex(
                        (item) => item._id === product._id
                    );
                    let newCount = 1;
                    if (isProdFound >= 0) {
                        newCount = items[isProdFound].count + 1;
                        items[isProdFound].count = newCount;
                        setMixBoxItems(items);
                    } else {
                        items.push({ ...product, count: 1 });
                        setMixBoxItems(items);
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
    return (
        <div className={'shopMixBoxContainer'}>
            <div className={'shopMixBoxContainer__filtersWrapper'}>
                <MixBoxFilters
                    mixBoxes={mixBoxes}
                    selectedBox={selectedBox}
                    handleChange={handleBoxChange}
                />
                <ShopFilters
                    handleChange={handleFilterChange}
                    filter={type}
                    direction={'row'}
                />
            </div>
            <div className={'shopMixBoxContainer__boxSummaryProductsWrapper'}>
                <MixBoxSummary
                    selectedBox={selectedBox}
                    boxItems={mixBoxItems}
                    itemsCount={getItemsCount()}
                    boxLimit={getBoxLimit()}
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
                                    addToBox={() => handleAddToBox(product)}
                                />
                            );
                        })
                    ) : (
                        <DataPrompt message={'No products were found'} />
                    )}
                </section>
            </div>
        </div>
    );
};

export default ShopMixBox;
