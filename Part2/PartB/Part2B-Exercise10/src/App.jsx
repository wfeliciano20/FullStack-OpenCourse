import { useState, useEffect } from 'react';
import FilterResults from './components/FilterResults';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123-4567', id: 1 },
    { name: 'Ada Lovelace', number: '390-440-5323', id: 2 },
    { name: 'Dan Abramov', number: '121-432-2343', id: 3 },
    { name: 'Mary Poppendieck', number: '391-236-4231', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    if(filterTerm.length > 0) {
      setFilteredPersons(
      persons.filter(person =>
        person.name.toLowerCase().includes(filterTerm.toLowerCase())
      )
    );
    }else{
      setFilteredPersons(persons);
    }
    
  }, [filterTerm, persons]);

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
      <FilterResults ter={filterTerm} setTerm={setFilterTerm} />
      <h2>add a new</h2>
      <PersonForm name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} submit={handleOnSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App;