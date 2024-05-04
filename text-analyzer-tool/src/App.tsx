import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'
import {useEffect, useRef, useState} from "react";
import {pronouns} from "./data/pronouns";

const App = () => {
    const [currentdata, setcurrentData] = useState("")
    const [results, setResults] = useState({
        words: 0, Characters: 0, sentences: 0, paragraphes: 0, pronouns: 0
    })
    const [resultAverage, setresultAverage] = useState({
        average: "", longest: ""
    })
    const regex = /\!|\.|\?/g

    const refData = useRef("")

    function updateData({target}: any) {
        setcurrentData(target.value)
    }

    useEffect(() => {
        setResults({
            words: currentdata.split(" ").length,
            Characters: currentdata.length,
            sentences: currentdata.trim().split(regex).filter((w: string) => w !== '').length,
            paragraphes: currentdata.trim().split(/\n/).filter((w: string) => w !== '').length,
            pronouns: currentdata.trim().replaceAll(regex, ' ').replace(/\n/g, ' ').toLowerCase().split(" ").filter((pr: string) => pronouns.includes(pr)).length
        })
        setresultAverage({
            longest: currentdata.trim().replaceAll(/\!|\.|\?|\,/g, ' ').replace(/\n/g, ' ').toLowerCase().split(" ")
                .sort((words: string, words1: string) => words.length > words1.length ? -1 : 1)[0],
            average: calculate(currentdata)
        })
    }, [currentdata])

    return (
        <>
            <Navbar/>
            <div className="small-container">
                <div className="main-app">
                    <ResultBox results={results}/>
                    <TextArea updatewords={updateData} ref={refData}/>
                    <BottomResultBox resultAverage={resultAverage}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

function calculate(currentdata: string) {
    {
        const wordspermin = 225;
        const words = currentdata.split(" ").length;
        const total = Math.floor(words / wordspermin)
        return total < 1 ? "1 minute" : (total+' minutes')
    }
}

export default App
