import React, { useState } from 'react';
import img from '../../assets/images/milkbar.jpg';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import InputUI from '../UI/InputUI/InputUI';
import SearchIcon from '@material-ui/icons/Search';

const POSListings = ({ addItem }) => {
    const [category, setCategory] = useState('bar');
    const [isLoading, data] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=${category}`
    );
    const changeCategory = (category) => {
        setCategory(category);
    };
    const getColor = (type) => {
        let colorClass = '';
        switch (type) {
            case 'milk':
                colorClass =
                    'listingContainer__listingWrapper__listedItem__tag__blue';
                break;
            case 'dark':
                colorClass =
                    'listingContainer__listingWrapper__listedItem__tag__dark';
                break;
            case 'white':
                colorClass =
                    'listingContainer__listingWrapper__listedItem__tag__yellow';
                break;
            default:
                colorClass =
                    'listingContainer__listingWrapper__listedItem__tag__blue';
        }
        return colorClass;
    };
    return (
        <div className={'listingContainer'}>
            {/*<div className={'listingContainer__searchBar'}>*/}
            {/*    <InputUI placeholder={'search'} />*/}
            {/*    <SearchIcon fontSize={'large'} />*/}
            {/*</div>*/}
            <div className={'listingContainer__listingWrapper'}>
                {isLoading ? (
                    <CircularLoadingIndicator height={'5rem'} />
                ) : (
                    data.products.map((product) => {
                        return (
                            <div
                                key={product._id}
                                className={
                                    'listingContainer__listingWrapper__listedItem'
                                }
                                onClick={() => addItem(product)}
                            >
                                <span
                                    className={`listingContainer__listingWrapper__listedItem__tag ${getColor(
                                        product.chocolate_type
                                    )}`}
                                />
                                <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                />
                                <p
                                    className={
                                        'listingContainer__listingWrapper__listedItem__title'
                                    }
                                >
                                    {product.name}
                                </p>
                                <p
                                    className={
                                        'listingContainer__listingWrapper__listedItem__price'
                                    }
                                >
                                    EGP{product.price}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
            <div className={'listingContainer__listingCategoriesWrapper'}>
                <div
                    className={
                        'listingContainer__listingCategoriesWrapper__category'
                    }
                    onClick={() => changeCategory('bar')}
                >
                    <h1>Chocolate bars</h1>
                </div>
                <div
                    className={
                        'listingContainer__listingCategoriesWrapper__category'
                    }
                    onClick={() => changeCategory('mixBox')}
                >
                    <h1>mix box</h1>
                </div>
                <div
                    className={
                        'listingContainer__listingCategoriesWrapper__category'
                    }
                    onClick={() => changeCategory('luxuryBox')}
                >
                    <h1>luxury box</h1>
                </div>
                <div
                    className={
                        'listingContainer__listingCategoriesWrapper__category'
                    }
                    onClick={() => changeCategory('cooking')}
                >
                    <h1>cooking</h1>
                </div>
            </div>
        </div>
    );
};

export default POSListings;
