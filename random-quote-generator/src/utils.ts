import {useEffect, useState} from "react";
import axios from "axios";


export const useQuoteFetcher = (url: string) => {
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(null);
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        setLoading(true);
        axios(url).then(data => {
            setdata(data.data);
            setLoading(false)
        }).catch(erreur => seterror(erreur))
    }
    return {loading, data, error, getData}
}

export const generateQuote=(quoteList:   any[], indexes: number  [])=>{
    let index :number= Math.floor(Math.random()*quoteList.length);
    while(indexes.includes(index)){
       index = Math.floor(Math.random()*quoteList.length)
    }
    console.log(indexes,index)
    return index
}