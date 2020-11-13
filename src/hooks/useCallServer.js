import { useState } from 'react';
import axios from 'axios';

const useCallServer = () => {
    const [error, setError] = useState(false);
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);

    const callServer = async (method, url, data, headers) => {
        console.log(url);
        let repsonse = await axios({
            method: method,
            url: url,
            data: data,
            headers: headers,
        });
        return repsonse;
    };

    return [
        response,
        setResponse,
        error,
        setError,
        callServer,
        loading,
        setLoading,
    ];
};
export default useCallServer;
