import {useState} from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={()=>setGood(good+1)}>good</button>
        <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
        <button onClick={()=>setBad(bad+1)}>bad</button>
      </div>
      <h2>statistics</h2>
      <div>
        <p>good {`${good}`}</p>
        <p>neutral {`${neutral}`}</p>
        <p>bad {`${bad}`}</p>
      </div>
    </div>
  );
}

export default App;
