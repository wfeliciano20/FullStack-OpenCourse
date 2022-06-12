import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123-4567'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleOnSubmit = e =>{
    e.preventDefault();
    if(newName === ''){
      alert('Name is required');
      return;
    }
    if(!newNumber.match(/^\d{3}-{1}\d{3}-{1}\d{4}$/g)){
        alert(`${newNumber} is not a valid number. Please use ###-###-#### format`);
        return;
      }
    
    if(persons.findIndex(person=>person.name === newName) !== -1 ){
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if(persons.findIndex(person=>person.number === newNumber) !== -1 ){
      alert(`${newNumber} is already added to phonebook`);
      return;
    }
    const personToAdd = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personToAdd));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input value={newName} onChange={(e)=>setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e)=>setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>{
        return <p key={person.name}>{`${person.name} - ${person.number}`}</p>
      })}
    </div>
  )
}

export default App;