import {useState, useEffect} from 'react';
const useFetch =(url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError]=useState(null);

    useEffect(() => {
        // console.log("Use Effect ran");
        // console.log(name);
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
                .then(res => {
                    if(!res.ok)
                    {
                        throw Error('Could not fetch the data...');
                    }
                    return res.json();
                })
                .then(data => {
                    // console.log(data);
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if(err.name === "AbortError"){
                        console.log('fetch aborted');
                    }
                    else{
                    setError(err.message);
                    setIsPending(false);
                    }
                })
        }, 1000);

        return ()=> abortCont.abort();
    }, []);
    return {data, isPending, error}
}

export default useFetch;