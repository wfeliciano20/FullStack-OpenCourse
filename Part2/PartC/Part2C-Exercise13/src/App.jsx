import { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayResults from './components/DisplayResults';


const App = () => {
  const [countries,setCountries]=useState([]);
  const [filterTerm,setFilterTerm]=useState('');
  const [filteredCountries,setFilteredCountries]=useState([]);
  const [message,setMessage]=useState('');

  useEffect(() =>{

    const getCountries= async () => {
      try{
        const {data} = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(data);
      }catch(e){
        console.error(e);
      }
    }
    getCountries();
  },[]);

  useEffect(() =>{
    
    const filterCountries= countries.filter(country => country.name.common.toLowerCase().includes(filterTerm.toLowerCase()));
    
    if(filterCountries.length===0){
      setFilteredCountries(countries);
    }
    else if(filterCountries.length > 10 ){
      
      setFilteredCountries(filterCountries);
      setMessage('Too many matches, specify another filter');
      
    }else if(filterCountries.length <= 10 && filterCountries.length > 1){
      
      setFilteredCountries(filterCountries);
      setMessage('');
    }
    else if(filterCountries.length < 1 ){
      setFilteredCountries(filterCountries);
      setMessage('No matches, specify another filter');
    }else if(filterCountries.length ===1){
      setFilteredCountries(filterCountries);
      setMessage('');
    }
    else{
    }
    
  }
  ,[filterTerm,countries,message]);

  return (
    <>
    <div>
      find countries <input value={filterTerm} onChange={(e)=>{ setFilterTerm(e.target.value)}} /> 
    </div>
    <div>
      <DisplayResults message={message} filteredCountries={filteredCountries} searchTerm={filterTerm} />
    </div>
    </>
    
  )
}

export default App;