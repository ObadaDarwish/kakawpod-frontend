import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchMixBoxItems = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        let canUpdate = true;
        setIsLoading(true);
        axios
            .get(url)
            .then((res) => {
                if (canUpdate) {
                    let mixBoxItems = res.data.items.map((item) => {
                        return {
                            _id: item.product_id._id,
                            name: item.product_id.name,
                            count: item.quantity,
                        };
                    });
                    setResponse(mixBoxItems);
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

    return [isLoading, response, setResponse, error, setError];
};
export default useFetchMixBoxItems;
