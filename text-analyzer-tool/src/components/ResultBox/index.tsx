import './index.scss'
import {pronouns} from "../../data/pronouns";

const ResultBox = ({word}: any) => {
    const regex = /\!|\.|\?/g
    console.log(word.trim().split(/\n/).filter((w: string) => w !== ''))
    console.log(word.trim().replace(regex, ' ').replace(/\n/, ' ').split(" "))
    const pronounscount = word.trim().replaceAll(regex, ' ').replace(/\n/g, ' ').toLowerCase().split(" ").filter((pr:string) => pronouns.includes(pr)).length
    const parCount = word.trim().split(/\n/).filter((w: string) => w !== '').length
    const sentences =word.trim().split(regex).filter((w:string)=>w!=='').length
    const resultBar = [
        {
            title: 'Words',
            value: word.split(" ").length,
        },
        {
            title: 'Characters',
            value: word.length,
        },
        {
            title: 'Sentences',
            value:sentences,
        },
        {
            title: 'Paragraphs ',
            value: parCount,
        },
        {
            title: 'Pronouns',
            value: pronounscount,
        },
    ]

    return (
        <div className="result-bar">
            {resultBar.map(({title, value}) => (
                <div className="result-box" key={title}>
                    <span className="box-title">{title}</span>
                    <span className="box-value">{value}</span>
                </div>
            ))}
        </div>
    )
}

export default ResultBox
