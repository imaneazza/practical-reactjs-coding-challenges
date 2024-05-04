import './index.scss'

const BottomResultBox = ({resultAverage}:any) => {
  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: resultAverage.average,
    },
    {
      title: 'Longest word:',
      value: resultAverage.longest,
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
