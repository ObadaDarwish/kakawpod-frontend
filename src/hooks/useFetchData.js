import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let canUpdate = true;
        setIsLoading(true);
        axios
            .get(url)
            .then((res) => {
                if (canUpdate) {
                    setResponse(res.data);
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
export default useFetchData;
