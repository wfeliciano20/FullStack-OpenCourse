import { useState, useEffect } from 'react';
import api from './services/api';
import FilterResults from './components/FilterResults';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    const getData = async()=>{
      try{
        const data = await api.getPersons();
        setPersons(data);
      }catch(e){
        setNotificationType('error');
        setMessage(`${e.message}`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
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
      setNotificationType('error');
      setMessage(`Name is required`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return;
    }
    if(newNumber === ''){
      setNotificationType('error');
      setMessage(`Number is required`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return;
    }

    if((!newNumber.match(/^\d{2}-\d{7}$/)) && (!newNumber.match(/^\d{3}-\d{8}$/))){
        setNotificationType('error');
        setMessage(`${newNumber} is not a valid number. Please use one of this ##-####### or ###-########`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
        return;
      }
    
    if(persons.findIndex(person=>person.name === newName) !== -1 ){
      
      if(window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)){
        const person = persons.find(person=>person.name === newName);
        const updatedPerson = {...person, number: newNumber};
        try{
          await api.updatePerson(person.id, updatedPerson);
          setNewName('');
          setNewNumber('');
        }catch(e){
          setNotificationType('error');
          setMessage(`${e.message}`);
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        }
        try {
          const data = await api.getPersons();
          setPersons(data);
          setNotificationType('success');
          setMessage(`${newName} has been updated`);
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        } catch (e) {
          setNotificationType('error');
          setMessage(`${e.message}`);
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        }
        
        return;
      }
      setNewName('');
      setNewNumber('');
      return;
    }
    if(persons.findIndex(person=>person.number === newNumber) !== -1 ){
      setNotificationType('error');
      setMessage(`${newNumber} is already added to phonebook`);
      setTimeout(() => {
        setMessage(null)
      }, 5000);
      return;
    }
    const personToAdd = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personToAdd));
    try{
      await api.addPerson(personToAdd);
      setNewName('');
      setNewNumber('');
      setNotificationType('success');
      setMessage(`${personToAdd.name} was successfully saved on server`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }catch (e) {
      setNotificationType('error');
      setMessage(`${e.message}`);
    }
    
  }

  const handleOnDeletePerson = async id => {
    try{
        const deletedPerson = persons.find(person=>person.id === id);
        await api.deletePerson(id);
        const personsAfterDelete = persons.filter(person=>person.id !== id);
        setPersons(personsAfterDelete);
        setNotificationType('success');
        setMessage(`${deletedPerson.name} was removed from server`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
    }catch(e) {
      setNotificationType('error');
      setMessage(`${e.message}`);
      setTimeout(() => {
          setMessage(null)
        }, 5000);
    }

  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={notificationType} />
      <FilterResults ter={filterTerm} setTerm={setFilterTerm} />
      <h2>add a new</h2>
      <PersonForm name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} submit={handleOnSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleOnDeletePerson} />
    </div>
  )
}

export default App;