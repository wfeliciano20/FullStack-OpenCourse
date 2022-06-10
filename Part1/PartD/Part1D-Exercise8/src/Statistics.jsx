import {useState, useEffect} from 'react'

const Statistics = ({goodFeedback,neutralFeedback,badFeedback}) => {
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
    useEffect(() => {
    if (!firstRender) {
    const totalCalc = goodFeedback + neutralFeedback + badFeedback;
    setTotal(totalCalc);
    const averageCalc = ((goodFeedback)*1+(neutralFeedback)*0+(badFeedback)*-1)/totalCalc;
    setAverage(averageCalc);
    const positiveCalc = ((goodFeedback)*100)/totalCalc;
    setPositive(positiveCalc)
    }
    if(firstRender) {
      setFirstRender(false);
    }
  }, [goodFeedback, neutralFeedback, badFeedback]);
  
  return (
    <>
        <p>all {`${total}`}</p>
        <p>average {`${average}`}</p>
        <p>positive {`${positive} %`}</p>
    </>
  )
}

export default Statistics