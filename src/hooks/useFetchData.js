import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            let response = await axios.get(url);
            return response;
        };
        getData()
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url]);

    return [isLoading, response, error];
};
export default useFetchData;
