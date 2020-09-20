import React from 'react';
import ShopFilters from '../ShopFilters/ShopFilters';
import Product from '../Product/Product';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import DataPrompt from '../DataPrompt/DataPrompt';
import { useHistory } from 'react-router-dom';

const queryString = require('query-string');

const ShopBars = ({ match, location }) => {
    let queryParams = queryString.parse(location.search);
    const { type } = queryParams;
    const history = useHistory();
    const [isLoading, data] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=bar${
            type ? '&chocolate_type=' + type : ''
        }`
    );

    const { products, totalPages } = data || {};
    console.log(isLoading, data);
    const handleFilterChange = (e) => {
        const event = e.target;
        history.push({
            pathname: match.path,
            search: `?category=bar&type=${event.name}`,
        });
    };
    return (
        <div className={'shopBarsContainer'}>
            <ShopFilters
                handleChange={handleFilterChange}
                filter={type}
                direction={'column'}
            />
            <div className={'shopBarsContainer__products'}>
                {isLoading ? (
                    <CircularLoadingIndicator height={'20rem'} />
                ) : products && products.length ? (
                    products.map((product) => {
                        return (
                            <Product
                                key={product._id}
                                image={product.images[0].url}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                            />
                        );
                    })
                ) : (
                    <DataPrompt message={'No products were found'} />
                )}
            </div>
        </div>
    );
};

export default ShopBars;
