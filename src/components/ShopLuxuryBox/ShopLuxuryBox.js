import React, { useState } from 'react';
import LuxuryBoxFilters from './LuxuryBoxFilters/LuxuryBoxFilters';
import { stringfyJSON } from '../../utils/jsonConversion';
import { infoNotification } from '../../utils/notification-utils';
import useFetchLuxuryBox from '../../hooks/useFetchLuxuryBox';
import ShopFilters from '../ShopFilters/ShopFilters';
import { useHistory } from 'react-router-dom';
import BoxSummary from '../BoxSummary/BoxSummary';
import Product from '../Product/Product';
import DataPrompt from '../DataPrompt/DataPrompt';
import useFetchProducts from '../../hooks/useFetchProducts';
import ConfirmDialog from '../Dialogs/ConfirmDialog/ConfirmDialog';
import { addToCart } from '../../store/actions/cart_actions';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import SkeletonComp from '../Skeleton/Skeleton';
import CircularLoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';

const queryString = require('query-string');
const ShopLuxuryBox = ({ match, location }) => {
    let queryParams = queryString.parse(location.search);
    let { type = 'milk' } = queryParams;
    const history = useHistory();
    const dispatch = useDispatch();
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [
        isLoading,
        error,
        myLuxuryBox,
        setMyLuxuryBox,
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
            weight += item.weight * item.count;
        });
        return weight;
    };
    const handleBoxChange = (box) => {
        let boxLimit = box.weight;
        if (getItemsCount() <= boxLimit) {
            setMyLuxuryBox((prevState) => {
                let updatedLuxuryBox = {
                    ...prevState,
                    ...box,
                    total: box.price + prevState.package.price,
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
        setMyLuxuryBox((prevState) => {
            let updatedState = {
                ...prevState,
                package: packaging,
                total: prevState.price + packaging.price,
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
    const updateLuxuryBoxItems = (type, bar) => {
        if (getItemsCount() < myLuxuryBox.weight || type === 'subtract') {
            let newCount = type === 'add' ? ++bar.count : --bar.count;

            setMyLuxuryBox((prevState) => {
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
                localStorage.setItem('luxuryBox', stringfyJSON(updatedState));
                return updatedState;
            });
        } else {
            infoNotification(
                'Box is full, please upgrade your box.',
                'Box limit'
            );
        }
    };
    const handleAddToBox = (product) => {
        let items = [...myLuxuryBox.items];
        const updateBoxState = (prevState) => {
            let updatedState = {
                ...prevState,
                items: items,
            };
            localStorage.setItem('luxuryBox', stringfyJSON(updatedState));
            return updatedState;
        };
        if (getItemsCount() < myLuxuryBox.weight) {
            let isProdFound = -1;
            isProdFound = items.findIndex((item) => item._id === product._id);
            let newCount = 1;
            if (isProdFound >= 0) {
                newCount = items[isProdFound].count + 1;
                items[isProdFound].count = newCount;
                setMyLuxuryBox((prevState) => {
                    return updateBoxState(prevState);
                });
            } else {
                items.push({ ...product, count: 1 });
                setMyLuxuryBox((prevState) => {
                    return updateBoxState(prevState);
                });
            }
        } else {
            infoNotification(
                'Box is full, please upgrade your box.',
                'Box limit'
            );
        }
    };
    const getBoxCount = (value, product) => {
        let weight = 0;
        myLuxuryBox.items.forEach((item) => {
            let newCount = product._id === item._id ? value : item.count;
            weight += item.weight * newCount;
        });
        return weight;
    };
    const countInputChangeHandler = (e, item) => {
        let { value } = e.target;
        value = value ? parseInt(value) : 0;
        if (getBoxCount(value, item) <= myLuxuryBox.weight) {
            setMyLuxuryBox((prevState) => {
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
                localStorage.setItem('luxuryBox', stringfyJSON(updatedState));
                return updatedState;
            });
        } else {
            infoNotification('Exceeding box limit.', 'limit');
        }
    };
    const confirmClearLuxuryBox = () => {
        setOpenConfirmDialog(true);
    };
    const closeConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };
    const clearLuxuryBox = () => {
        closeConfirmDialog();
        setMyLuxuryBox((prevState) => {
            let updatedState = {
                ...prevState,
                items: [],
            };
            localStorage.setItem('luxuryBox', stringfyJSON(updatedState));
            return updatedState;
        });
    };
    const addLuxuryBoxToCart = () => {
        dispatch(setLoading(true));
        dispatch(addToCart({ ...myLuxuryBox, count: 1 }));
        setMyLuxuryBox((prevState) => {
            localStorage.removeItem('luxuryBox');
            return {
                ...prevState,
                items: [],
            };
        });
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 500);
    };
    return (
        <div className={'luxuryBoxContainer'}>
            <ConfirmDialog
                open={openConfirmDialog}
                checkText={'clear'}
                onClose={clearLuxuryBox}
                close={closeConfirmDialog}
            />
            <>
                <div className={'priceTag'}>
                    <p>
                        Total EGP
                        {myLuxuryBox.total}
                    </p>
                </div>
                <h1 className={'luxuryBoxContainer__title'}>Choose a box</h1>
                {luxuryBoxes.length > 0 && (
                    <LuxuryBoxFilters
                        luxuryBoxes={luxuryBoxes}
                        selectedBox={myLuxuryBox}
                        handleChange={handleBoxChange}
                    />
                )}

                <div className={'luxuryBoxContainer__luxuryBoxPackagesWrapper'}>
                    {!isLoading && luxuryBoxesPackages ? (
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
                        })
                    ) : (
                        <CircularLoadingIndicator height={'5rem'} />
                    )}
                </div>
                <h1 className={'luxuryBoxContainer__title'}>Add chocolate</h1>
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
                        clearBoxHandler={confirmClearLuxuryBox}
                        handleInputChange={countInputChangeHandler}
                        handleAddToCart={addLuxuryBoxToCart}
                        price={myLuxuryBox.total}
                    />
                    <section
                        className={
                            'luxuryBoxContainer__productsWrapper__products'
                        }
                    >
                        {areLoadingBars ? (
                            Array(6)
                                .fill(0)
                                .map((item, index) => {
                                    return <SkeletonComp key={index} />;
                                })
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
                                        productId={product._id}
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
                            <DataPrompt message={'No products were found'} />
                        )}
                    </section>
                </div>
            </>
        </div>
    );
};

export default ShopLuxuryBox;
