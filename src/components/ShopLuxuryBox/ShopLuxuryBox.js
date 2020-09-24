import React from 'react';
import LuxuryBoxFilters from './LuxuryBoxFilters/LuxuryBoxFilters';
import { stringfyJSON } from '../../utils/jsonConversion';
import { infoNotification } from '../../utils/notification-utils';
import useFetchLuxuryBox from '../../hooks/useFetchLuxuryBox';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
import ShopFilters from '../ShopFilters/ShopFilters';
import { useHistory } from 'react-router-dom';
import BoxSummary from '../BoxSummary/BoxSummary';
import Product from '../Product/Product';
import DataPrompt from '../DataPrompt/DataPrompt';
import useFetchProducts from '../../hooks/useFetchProducts';
const queryString = require('query-string');
const ShopLuxuryBox = ({ match, location }) => {
    let queryParams = queryString.parse(location.search);
    let { type = 'milk' } = queryParams;
    const history = useHistory();
    const [
        isLoading,
        error,
        myLuxuryBox,
        setMLuxuryBox,
        luxuryBoxes,
        luxuryBoxesPackages,
    ] = useFetchLuxuryBox(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=luxuryBox`,
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=packageBox`
    );
    let [areLoadingBars, bars] = useFetchProducts(
        `${
            process.env.REACT_APP_API_ENDPOINT
        }/product/all?category=miniBar&type=${type ? type : 'milk'}`
    );
    const getItemsCount = () => {
        let weight = 0;
        myLuxuryBox.items.forEach((item) => {
            weight += item.weight * item.quantity;
        });

        return weight;
    };
    const handleBoxChange = (box) => {
        let boxLimit = box.weight;
        console.log(getItemsCount());
        if (getItemsCount() <= boxLimit) {
            setMLuxuryBox((prevState) => {
                let updatedLuxuryBox = {
                    ...prevState,
                    ...box,
                };
                localStorage.setItem(
                    'luxuryBox',
                    JSON.stringify(updatedLuxuryBox)
                );
                return updatedLuxuryBox;
            });
        } else {
            infoNotification(
                `Can't downgrade, please remove extra items from box.`,
                'Box limit'
            );
        }
    };
    const handlePackageChange = (packaging) => {
        setMLuxuryBox((prevState) => {
            let updatedState = {
                ...prevState,
                package: packaging,
            };
            localStorage.setItem('luxuryBox', stringfyJSON(updatedState));
            return updatedState;
        });
    };
    const handleFilterChange = (e) => {
        const event = e.target;
        history.push({
            pathname: match.path,
            search: `?category=bar&type=${event.name}`,
        });
    };
    const updateLuxuryBoxItems = () => {};
    const confirmClearMixBox = () => {};
    const handleAddToBox = (item) => {};
    return (
        <div className={'luxuryBoxContainer'}>
            {!isLoading ? (
                <>
                    <div className={'priceTag'}>
                        <p>
                            Total EGP
                            {myLuxuryBox.price + myLuxuryBox.package.price}
                        </p>
                    </div>
                    <h1 className={'luxuryBoxContainer__title'}>
                        Choose a box
                    </h1>
                    <LuxuryBoxFilters
                        luxuryBoxes={luxuryBoxes}
                        selectedBox={myLuxuryBox}
                        handleChange={handleBoxChange}
                    />
                    <div
                        className={
                            'luxuryBoxContainer__luxuryBoxPackagesWrapper'
                        }
                    >
                        {luxuryBoxesPackages &&
                            luxuryBoxesPackages.map((packageBox) => {
                                return (
                                    <div
                                        className={`luxuryBoxContainer__luxuryBoxPackagesWrapper__package 
                                    ${
                                        myLuxuryBox.package._id ===
                                            packageBox._id &&
                                        'luxuryBoxContainer__luxuryBoxPackagesWrapper__package--active'
                                    }`}
                                        key={packageBox._id}
                                        onClick={() =>
                                            handlePackageChange(packageBox)
                                        }
                                    >
                                        <img
                                            src={packageBox.images[0].url}
                                            alt={packageBox.name}
                                        />
                                        <p>
                                            {packageBox.price
                                                ? 'EGP' + packageBox.price
                                                : 'free'}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                    <h1 className={'luxuryBoxContainer__title'}>
                        Add chocolate
                    </h1>
                    <ShopFilters
                        handleChange={handleFilterChange}
                        filter={type}
                        direction={'row'}
                    />
                    <div className={'luxuryBoxContainer__productsWrapper'}>
                        <BoxSummary
                            type={'Luxury box'}
                            selectedBox={myLuxuryBox}
                            boxItems={myLuxuryBox.items}
                            itemsCount={getItemsCount()}
                            boxLimit={myLuxuryBox.weight}
                            handleItemUpdate={updateLuxuryBoxItems}
                            clearMixBoxHandler={confirmClearMixBox}
                            price={
                                myLuxuryBox.price + myLuxuryBox.package.price
                            }
                        />
                        <section
                            className={
                                'luxuryBoxContainer__productsWrapper__products'
                            }
                        >
                            {areLoadingBars ? (
                                <CircularLoadingIndicator height={'40rem'} />
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
                <CircularLoadingIndicator height={'40rem'} />
            )}
        </div>
    );
};

export default ShopLuxuryBox;
