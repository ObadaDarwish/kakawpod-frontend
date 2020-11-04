import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchAdminOrders = (url, page) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState({ orders: [], total: 0 });
    const [error, setError] = useState(false);
    const getRequest = (canUpdate, callback) => {
        axios
            .get(url)
            .then((res) => {
                if (canUpdate) {
                    callback(res);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (canUpdate) {
                    setError(err);
                    setIsLoading(false);
                }
            });
    };
    useEffect(() => {
        if (page === 1) {
            let canUpdate = true;
            setIsLoading(true);
            getRequest(canUpdate, (res) => {
                setResponse(res.data);
            });
            return () => {
                canUpdate = false;
            };
        }
    }, [url]);

    useEffect(() => {
        if (page !== 1) {
            let canUpdate = true;
            setIsLoading(true);
            getRequest(canUpdate, (res) => {
                setResponse((prevState) => {
                    let previousOrders = prevState.orders;
                    return {
                        total: res.data.total,
                        orders: [...previousOrders, ...res.data.orders],
                    };
                });
            });
            return () => {
                canUpdate = false;
            };
        }
    }, [page]);

    return [isLoading, response, setResponse, error, setError];
};
export default useFetchAdminOrders;
