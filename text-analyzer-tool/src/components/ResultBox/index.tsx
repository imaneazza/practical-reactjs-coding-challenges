import './index.scss'
import {pronouns} from "../../data/pronouns";

const ResultBox = ({results}: any) => {
    const resultBar = [
        {
            title: 'Words',
            value: results.words,
        },
        {
            title: 'Characters',
            value: results.Characters,
        },
        {
            title: 'Sentences',
            value:results.sentences,
        },
        {
            title: 'Paragraphs ',
            value: results.paragraphes,
        },
        {
            title: 'Pronouns',
            value: results.pronouns,
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
