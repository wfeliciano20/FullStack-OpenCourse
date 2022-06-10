import {useState} from 'react';
import Statistics from './Statistics';
import Button from './Button';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickOnGood = () => {
    setGood(good + 1);
  }

  const handleClickOnNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickOnBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text={'good'} handleClick={handleClickOnGood} />
        <Button text={'neutral'} handleClick={handleClickOnNeutral} />
        <Button text={'bad'} handleClick={handleClickOnBad} />
      </div>
      <h2>statistics</h2>
      <div>
      { good === 0 && neutral===0 && bad===0 ? <p>No feedback given</p>:<Statistics goodFeedback={good} neutralFeedback={neutral} badFeedback={bad} />}
      </div>
    </div>
  );
}

export default App;
