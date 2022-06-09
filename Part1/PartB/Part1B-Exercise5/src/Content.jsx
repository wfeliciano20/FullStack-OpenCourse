
const Content = ({parts}) => {

  return (
    <div>
    {parts.map(part => {
      return  (
        <p key={part.name}>
        {part.name} {part.exercises}
        </p>
      )
    })}
    </div>
  )
}

export default Content;