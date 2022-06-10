import {useState} from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

// All the functions are called when the button is clicked. and have parameters
// to deal with react doing the state changes asynchronously when the component
// is rerendered. This is done to show the actual value the state will have once
// the component rerenders

  const getTotal = (incrementGood=0,incrementNeutral=0,incrementBad=0) => { 
    const totalCalc = (good+incrementGood) + (neutral+incrementNeutral) + (bad+incrementBad);
    setTotal(totalCalc);
  }

  const getAverage = (incrementGood=0,incrementNeutral=0,incrementBad=0) => { 
    const total = (good + incrementGood) + (neutral + incrementNeutral) + (bad + incrementBad);
    const averageCalc = ((good+incrementGood)*1+(neutral+incrementNeutral)*0+(bad+incrementBad)*-1)/total;
    setAverage(averageCalc);
  }

  const getPositive = (incrementGood=0,incrementNeutral=0,incrementBad=0) => {
    const total = (good + incrementGood) + (neutral + incrementNeutral) + (bad + incrementBad);
    const positiveCalc = ((good+incrementGood)*100)/total;
    setPositive(positiveCalc);
  }

  const handleClickOnGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
    getTotal(1,0,0);
    getAverage(1,0,0);
    getPositive(1,0,0);
  }

  const handleClickOnNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    getTotal(0,1,0);
    getAverage(0,1,0);
    getPositive(0,1,0);
  }

  const handleClickOnBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    getTotal(0,0,1);
    getAverage(0,0,1);
    getPositive(0,0,1);
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
        <p>good {`${good}`}</p>
        <p>neutral {`${neutral}`}</p>
        <p>bad {`${bad}`}</p>
        <p>all {`${total}`}</p>
        <p>average {`${average}`}</p>
        <p>positive {`${positive} %`}</p>
      </div>
    </div>
  );
}

export default App;
