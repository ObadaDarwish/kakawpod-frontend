import React, { useState } from 'react';
import img from '../../assets/images/milkbar.jpg';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import DataPrompt from '../DataPrompt/DataPrompt';
import PosMixBoxDialog from '../Dialogs/POSMixBoxDialog/POSMixBoxDialog';
import PosProduct from '../POSProduct/POSProduct';

const POSListings = ({ addItem }) => {
    const [category, setCategory] = useState('bar');
    const [isLoading, data] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=${category}`
    );
    const changeCategory = (category) => {
        setCategory(category);
    };

    return (
        <div className={'listingContainer'}>
            <div className={'listingContainer__listingWrapper'}>
                {isLoading ? (
                    <CircularLoadingIndicator height={'20rem'} />
                ) : data.products.length ? (
                    data.products.map((product) => {
                        return (
                            <PosProduct
                                addItem={addItem}
                                product={product}
                                key={product._id}
                            />
                        );
                    })
                ) : (
                    <DataPrompt message={'No products were found.'} />
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
                <div
                    className={
                        'listingContainer__listingCategoriesWrapper__category'
                    }
                    onClick={() => changeCategory('drinks')}
                >
                    <h1>drinks</h1>
                </div>
                <div
                    className={
                        'listingContainer__listingCategoriesWrapper__category'
                    }
                    onClick={() => changeCategory('cakes')}
                >
                    <h1>cakes</h1>
                </div>
                <div
                    className={
                        'listingContainer__listingCategoriesWrapper__category'
                    }
                    onClick={() => changeCategory('iceCream')}
                >
                    <h1>Ice cream</h1>
                </div>
                <div
                    className={
                        'listingContainer__listingCategoriesWrapper__category'
                    }
                    onClick={() => changeCategory('packageBox')}
                >
                    <h1>Packaging</h1>
                </div>
            </div>
        </div>
    );
};

export default POSListings;
