import {useState} from 'react';
import Statistics from './Statistics';

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
        <button onClick={handleClickOnGood}>good</button>
        <button onClick={handleClickOnNeutral}>neutral</button>
        <button onClick={handleClickOnBad}>bad</button>
      </div>
      <h2>statistics</h2>
      <div>
        <Statistics goodFeedback={good} neutralFeedback={neutral} badFeedback={bad} />
      </div>
    </div>
  );
}

export default App;
