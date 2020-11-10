import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchAdminProducts = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState({ products: [], total: 0 });
    const [error, setError] = useState(false);

    useEffect(() => {
        let canUpdate = true;
        setIsLoading(true);
        axios
            .get(url)
            .then((res) => {
                if (canUpdate) {
                    setResponse((prevState) => {
                        return {
                            products: [
                                ...prevState.products,
                                ...res.data.products,
                            ],
                            total: res.data.total,
                        };
                    });
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

export default useFetchAdminProducts;
