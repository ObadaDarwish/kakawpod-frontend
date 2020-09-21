import React, { useState } from 'react';
import ShopFilters from '../ShopFilters/ShopFilters';
import { useHistory } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import Product from '../Product/Product';
import DataPrompt from '../DataPrompt/DataPrompt';
import MixBoxSummary from './MixBoxSummary/MixBoxSummary';
import MixBoxFilters from './MixBoxFilters/MixBoxFilters';
import { infoNotification } from '../../utils/notification-utils';

const queryString = require('query-string');
const ShopMixBox = ({ match, location }) => {
    let queryParams = queryString.parse(location.search);
    const [boxItems, setBoxItems] = useState([]);
    let { type } = queryParams;
    if (!type) {
        type = 'milk';
    }
    let [isLoadingMixBox, mixBoxes] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=mixBox`
    );
    mixBoxes = mixBoxes && mixBoxes.products;
    const [selectedBox, setSelectedBox] = useState(
        mixBoxes ? mixBoxes[0] : { name: '3 bars', _id: 0 }
    );
    let [isLoadingBars, bars] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=bar&type=${
            type ? type : 'milk'
        }`
    );
    if (bars) {
        bars = bars.products;
    }
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
        boxItems.forEach((item) => {
            count += item.count;
        });
        return count;
    };
    const getBoxLimit = () => {
        return parseInt(selectedBox.name.substr(0, 1));
    };
    const handleAddToBox = (product) => {
        let items = [...boxItems];
        if (getItemsCount() < getBoxLimit()) {
            let isProdFound = -1;
            isProdFound = items.findIndex((item) => item._id === product._id);
            let newCount = 1;
            if (isProdFound >= 0) {
                newCount = items[isProdFound].count + 1;
                items[isProdFound].count = newCount;
                setBoxItems(items);
            } else {
                items.push({ ...product, count: 1 });
                setBoxItems(items);
            }
        } else {
            infoNotification(
                'Box is full, please upgrade your bix.',
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
                    boxItems={boxItems}
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
                    ) : bars && bars.length ? (
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
