import React from 'react'

const FilterResults = ({term,setTerm}) => {
  return (
    <div>
        filter show with <input value={term} onChange={(e)=>setTerm(e.target.value)} />
    </div>
  )
}

export default FilterResults