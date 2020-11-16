import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchDataScroll = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState({ data: [], total: 0 });
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
                            data: [...prevState.data, ...res.data.docs],
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

export default useFetchDataScroll;
