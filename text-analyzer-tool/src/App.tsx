import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'
import {useState} from "react";

const App = () => {
    const [currentdata,setcurrentData] = useState("")
    function updateData({target}:any) {
        console.log(target.value)
        setcurrentData(target.value)
    }

    return (
        <>
            <Navbar/>
            <div className="small-container">
                <div className="main-app">
                    <ResultBox word={currentdata}/>
                    <TextArea updatewords={updateData}/>
                    <BottomResultBox word={currentdata} />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default App
