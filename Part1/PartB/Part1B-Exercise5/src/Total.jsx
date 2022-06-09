

const Total = ({parts}) => {
  const total = parts.reduce((accumulator,part) => (accumulator + part.exercises),0);
  
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

export default Total;