import './index.scss'

const BottomResultBox = ({word}:any) => {
  const longest = word.trim().replaceAll(/\!|\.|\?|\,/g, ' ').replace(/\n/g, ' ').toLowerCase().split(" ")
      .sort((words:string, words1:string)=>words.length>words1.length?-1:1)[0]
  console.log("lonest",longest)
  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: '-',
    },
    {
      title: 'Longest word:',
      value: longest,
    },
  ]

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
