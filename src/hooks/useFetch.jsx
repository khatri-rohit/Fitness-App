import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [URL, setURL] = useState(url)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])


    useEffect(() => {
        (async () => {
            try {
                setError(false)
                setLoading(true)
                const resp = await axios.get(URL);
                const result = resp.data
                setData(result.items)
            } catch (error) {
                console.log("Error");
                setError(true)
            } finally {
                setLoading(false)
            }
        })()
    }, [])


    return { data, loading, error, setURL };
};

export default useFetch;
