import React from 'react'

const StatisticLine = ({text,value,extra}) => {
  return (
        <p>{`${text} ${value}${extra}`}</p>
  )
}

export default StatisticLine