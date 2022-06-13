
const Persons = ({persons, handleDelete}) => {
  return (
    <div>
      {
        persons.map(person =>{
        return (
          <div key={person.number}>
            <p>{`${person.name} - ${person.number}`}</p>
            <button  onClick={handleDelete.bind(this, person.id)}>Delete</button>
          </div>
        )})
      }
    </div>
  );
}

export default Persons;