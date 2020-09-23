import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseJSON } from '../utils/jsonConversion';

const useFetchMixBox = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [mixBoxes, setMixBoxes] = useState([]);
    const [error, setError] = useState(false);
    let defaultMixBox = {
        items: [],
        limit: 3,
        name: '3 bars',
    };
    let [myMixBox, setMyMixBox] = useState(
        parseJSON(localStorage.getItem('mixBox')) || defaultMixBox
    );
    useEffect(() => {
        let canUpdate = true;
        setIsLoading(true);
        axios
            .get(url)
            .then((res) => {
                if (canUpdate) {
                    let tempMixBoxes = res.data.products;
                    let isMixBoxFound = tempMixBoxes.findIndex(
                        (box) => box.name === '3 bars'
                    );
                    setMixBoxes(tempMixBoxes);
                    if (!localStorage.getItem('mixBox')) {
                        setMyMixBox((prevState) => {
                            return {
                                ...prevState,
                                ...tempMixBoxes[isMixBoxFound],
                            };
                        });
                    }
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (canUpdate) {
                    setError(err);
                    setIsLoading(false);
                }
            });
        return () => {
            canUpdate = false;
        };
    }, [url]);

    return [isLoading, error, myMixBox, setMyMixBox, mixBoxes];
};
export default useFetchMixBox;
