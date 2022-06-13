import { useState, useEffect } from 'react';
import api from './services/api';
import FilterResults from './components/FilterResults';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    const getData = async()=>{
      try{
        const data = await api.getPersons();
        setPersons(data);
      }catch(e){
        console.error(e);
      }
      
    }
    getData();
  },[])
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

  const handleOnSubmit = async e =>{
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
    await api.addPerson(personToAdd);
    setNewName('');
    setNewNumber('');
  }

  const handleOnDeletePerson = async id => {
    await api.deletePerson(id);
    const personsAfterDelete = persons.filter(person=>person.id !== id);
    setPersons(personsAfterDelete);
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterResults ter={filterTerm} setTerm={setFilterTerm} />
      <h2>add a new</h2>
      <PersonForm name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} submit={handleOnSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleOnDeletePerson} />
    </div>
  )
}

export default App;