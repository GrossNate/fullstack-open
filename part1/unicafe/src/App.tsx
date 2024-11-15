import { useState } from 'react'

const Button = (
  { handler, buttonText }: { handler: () => void, buttonText: string }) => {
  return (
    <button onClick={handler}>{buttonText}</button>
  );
}

const StatsLine = ({text, value}: {text: string, value: number | string}) => {
  return (
    <>
      {text}: {value}<br />
    </>
  )
}

const Stats = ({ good, neutral, bad }: { good: number, neutral: number, bad: number }) => {
  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const positive = good / all;

  if (good + neutral + bad < 1) {
    return (
      <p>No feedback given.</p>
    );
  } else {
    return (
      <>
        <StatsLine text="good" value={good} />
        <StatsLine text="neutral" value={neutral} />
        <StatsLine text="bad" value={bad} />
        <StatsLine text="all" value={all} />
        <StatsLine text="avg" value={avg.toFixed(2)} />
        <StatsLine text="positive" value={(positive * 100).toFixed(2) + "%"} />
      </>
    );
  }
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