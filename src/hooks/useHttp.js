import { useState } from 'react';

const sendHttp = async (url, config) => {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong. Failed to get data from server.');
    }

    return resData;
};

const useHttp = (url, config, initialValue) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState();

    const clearData = () => {
        setData(initialValue);
    };

    const sendHttpRequest = async (data = {}) => {
        setLoading(true);
        try {
            const resData = await sendHttp(url, { ...config, ...data });
            setData(resData);
        } catch (error) {
            setError(error.message || 'Something went wrong.');
        }
        setLoading(false);
    };

    return {
        loading,
        data,
        error,
        sendHttpRequest,
        clearData,
    };
};

export default useHttp;