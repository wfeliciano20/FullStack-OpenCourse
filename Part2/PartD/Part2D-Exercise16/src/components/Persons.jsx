
const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person =>{
        return <p key={person.name}>{`${person.name} - ${person.number}`}</p>
      })}
    </div>
  );
}

export default Persons;