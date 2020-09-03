import { useState } from 'react';
import axios from 'axios';

const useCallServer = () => {
    const [error, setError] = useState(false);
    const [response, setResponse] = useState({});

    const callServer = async (method, url, data) => {
        await axios({
            method: method,
            url: url,
            data: data,
        });
    };

    return [response, setResponse, error, setError, callServer];
};
export default useCallServer;
