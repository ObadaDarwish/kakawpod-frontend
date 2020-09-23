import React, { useState } from 'react';
import LuxuryBoxFilters from './LuxuryBoxFilters/LuxuryBoxFilters';
import { stringfyJSON } from '../../utils/jsonConversion';
import { infoNotification } from '../../utils/notification-utils';
import useFetchLuxuryBox from '../../hooks/useFetchLuxuryBox';
import LoadingIndicator from '../LoadingIndicator/CircularLoadingIndicator';
const queryString = require('query-string');
const ShopLuxuryBox = ({ match, location }) => {
    let queryParams = queryString.parse(location.search);
    let { type = 'milk' } = queryParams;
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
    return (
        <div className={'luxuryBoxContainer'}>
            {!isLoading ? (
                <>
                    <h1 className={'luxuryBoxContainer__chooseBoxTitle'}>
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
                                        <p>EGP{packageBox.price}</p>
                                    </div>
                                );
                            })}
                    </div>
                </>
            ) : (
                <LoadingIndicator />
            )}
        </div>
    );
};

export default ShopLuxuryBox;
