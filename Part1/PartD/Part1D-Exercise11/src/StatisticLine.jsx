import React from 'react'

const StatisticLine = ({text,value,extra}) => {
  return (
        <tr>
          <td>{`${text}`}</td>
          <td>{`${value}${extra}`}</td>
        </tr>
  )
}

export default StatisticLine