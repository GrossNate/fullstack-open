import { useState } from 'react'

const Button = (
  { handler, buttonText }: { handler: () => void, buttonText: string }) => {
  return (
    <button onClick={handler}>{buttonText}</button>
  );
}

const Stats = ({good, neutral, bad} : {good:number, neutral:number, bad:number}) => {
  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const positive = good / all;

  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average: {Number.isNaN(avg)? "n.a." : avg}</p>
      <p>positive: {Number.isNaN(positive) ? "n.a." : positive.toString() + " %"}</p>
    </>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <h2>give feedback</h2>
      <Button handler={() => { setGood(good + 1) }} buttonText="good" />
      <Button handler={() => { setNeutral(neutral + 1) }} buttonText="neutral" />
      <Button handler={() => { setBad(bad + 1) }} buttonText="bad" />
      <h2>statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App