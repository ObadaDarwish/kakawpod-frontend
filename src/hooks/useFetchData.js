import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let canUpdate = true;
        const getData = async () => {
            let res = await axios.get(url);
            return res;
        };
        getData()
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

    return [isLoading, response, error];
};
export default useFetchData;
