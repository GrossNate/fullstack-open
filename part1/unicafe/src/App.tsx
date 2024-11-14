import { useState } from 'react'

const Button = (
  { handler, buttonText }: { handler: () => void, buttonText: string }) => {
  return (
    <button onClick={handler}>{buttonText}</button>
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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  )
}

export default App