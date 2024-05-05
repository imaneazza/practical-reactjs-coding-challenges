import classnames from "classnames"
import {ReactComponent as Button} from "../src/assets/icons/button.svg"
import {ReactComponent as Quotation} from "../src/assets/icons/quotation.svg"
import {ReactComponent as Twitter} from "../src/assets/icons/twitter.svg"
import {ReactComponent as Whatsapp} from "../src/assets/icons/whatsapp.svg"
import "./App.css"
import {useEffect, useState} from "react";
import {generateQuote, useQuoteFetcher} from "./utils";
import {Simulate} from "react-dom/test-utils";

function App() {
    const {data: quotesList, loading, getData, error} = useQuoteFetcher('http://localhost:4000/quotes')
    const [quote, setQuote] = useState<any>(null)
    const [indexList, setIndexList] = useState<number[]>([])
    const [index, setIndex] = useState<number>(0)
    useEffect(() => {
        if(quotesList.length>0){
            console.log("called")
            setIndexList([])
            const current = generateQuote(quotesList,[]);
            setQuote(quotesList[current])
            setIndex(indexList.length)
            setIndexList(list=>[...list,current])
        }

    }, [quotesList]);
    let classes = classnames("rotate cp")
    if (index == 0) {
        classes = classnames("rotate cp disabled-button")
    }
    const gotoNext = () => {
        console.log(indexList,index)
        if(index<indexList.length-1){
            const currentIndex = index + 1;
            setIndex((index: number) => index + 1);
            setQuote(quotesList[currentIndex])
        }else{
            if (indexList.length == quotesList.length) {
                getData()
            } else {
                const current = generateQuote(quotesList,indexList);
                setQuote(quotesList[current])
                setIndexList(list=>[...list,current])
                setIndex(indexList.length)
            }

        }


    }
    const gotoprevious = () => {
        const currentIndex = index - 1;
        setIndex((index: number) => index - 1);
        setQuote(quotesList[currentIndex])
    }

    return (
        <>
            <header>
                <div className="top-strip"/>
            </header>
            <div className="container">
                <div className="quotation-box ">
                    <Quotation/>
                    {loading && <p>Loading ...</p>}
                    {!loading && quote && <div className="quote">
                        <p>
                            {quote.quote}
                        </p>
                        <span>-{quote.author}</span>
                    </div>}

                    <div className="bottom-navigation">
                        <div>
                            <Button className={classes} onClick={gotoprevious}/>
                            <Button className="cp" onClick={gotoNext}/>
                        </div>
                        <div className="share">
                            <span>Share At:</span>
                            <Twitter title="Post this quote on twitter!" className="cp"/>
                            <Whatsapp title="Post this quote on WhatsApp!" className="cp"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-strip"/>
        </>
    )
}

export default App
