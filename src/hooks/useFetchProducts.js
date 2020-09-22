import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchProducts = (url) => {
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
                    let products = res.data.products.map((item) => {
                        return {
                            ...item,
                            isAddButtonDisabled: false,
                        };
                    });
                    setResponse(products);
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
export default useFetchProducts;
