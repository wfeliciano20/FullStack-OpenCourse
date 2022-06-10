import {useState, useEffect} from 'react'
import StatisticLine from './StatisticLine';

const Statistics = ({goodFeedback,neutralFeedback,badFeedback}) => {
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  
    useEffect(() => {
    
    const totalCalc = goodFeedback + neutralFeedback + badFeedback;
    setTotal(totalCalc);
    const averageCalc = ((goodFeedback)*1+(neutralFeedback)*0+(badFeedback)*-1)/totalCalc;
    setAverage(averageCalc);
    const positiveCalc = ((goodFeedback)*100)/totalCalc;
    setPositive(positiveCalc)
    
  }, [goodFeedback, neutralFeedback, badFeedback]);
  
  return (
    <>
        <StatisticLine text="good" value ={goodFeedback} extra={''} />
        <StatisticLine text="neutral" value ={neutralFeedback} extra={''} />
        <StatisticLine text="bad" value ={badFeedback} extra={''} />
        <StatisticLine text="total" value ={total} extra={''} />
        <StatisticLine text="average" value ={average} extra={''} />
        <StatisticLine text="positive" value ={positive} extra={'%'} />
    </>
  )
}

export default Statistics