import './index.scss'
import {forwardRef} from "react";

const TextArea = forwardRef(({updatewords,ref}:any) => {
  return <textarea  ref={ref} className="text-area" placeholder="Paste your text here..." onChange={updatewords}/>
})

export default TextArea
