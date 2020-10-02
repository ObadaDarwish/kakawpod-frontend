import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseJSON } from '../utils/jsonConversion';

const useFetchLuxuryBox = (url1, url2) => {
    const [isLoading, setIsLoading] = useState(true);
    const [luxuryBoxes, setLuxuryBoxes] = useState([]);
    const [luxuryBoxesPackages, setLuxuryBoxesPackages] = useState([]);

    let defaultMixBox = {
        items: [],
        weight: 500,
        name: '500g luxury box',
        package: {
            _id: 0,
        },
        total: 0,
    };
    let [myLuxuryBox, setMLuxuryBox] = useState(
        parseJSON(localStorage.getItem('luxuryBox')) || defaultMixBox
    );
    const [error, setError] = useState(false);

    useEffect(() => {
        let canUpdate = true;
        setIsLoading(true);
        axios
            .all([axios.get(url1), axios.get(url2)])
            .then(
                axios.spread((...responses) => {
                    let tempLuxuryBoxes = responses[0].data.products;
                    setLuxuryBoxes(tempLuxuryBoxes);
                    let isLuxuryBoxFound = tempLuxuryBoxes.findIndex(
                        (box) => box.weight === 500
                    );
                    let tempLuxuryBoxesPackages = responses[1].data.products;
                    setLuxuryBoxesPackages(tempLuxuryBoxesPackages);
                    let isLuxuryBoxPackageFound = tempLuxuryBoxesPackages.findIndex(
                        (box) => box.name === 'free package box'
                    );
                    if (canUpdate) {
                        setIsLoading(false);
                        if (!localStorage.getItem('luxuryBox')) {
                            setMLuxuryBox((prevState) => {
                                return {
                                    ...prevState,
                                    ...tempLuxuryBoxes[isLuxuryBoxFound],
                                    package: {
                                        ...tempLuxuryBoxesPackages[
                                            isLuxuryBoxPackageFound
                                        ],
                                    },
                                    total:
                                        tempLuxuryBoxes[isLuxuryBoxFound].price,
                                };
                            });
                        }
                    }
                })
            )
            .catch((err) => {
                if (canUpdate) {
                    setError(err);
                    setIsLoading(false);
                }
            });
        return () => {
            canUpdate = false;
        };
    }, [url1, url2]);

    return [
        isLoading,
        error,
        myLuxuryBox,
        setMLuxuryBox,
        luxuryBoxes,
        luxuryBoxesPackages,
    ];
};
export default useFetchLuxuryBox;
