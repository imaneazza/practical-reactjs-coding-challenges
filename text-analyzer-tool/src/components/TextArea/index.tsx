import './index.scss'

const TextArea = ({updatewords}:any) => {
  return <textarea className="text-area" placeholder="Paste your text here..." onChange={updatewords}/>
}

export default TextArea
