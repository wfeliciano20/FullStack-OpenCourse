import { useState, useEffect } from 'react';
import Country from './Country';

const DisplayResults = ({message,filteredCountries , searchTerm}) => {

  const [showCountry,setShowCountry]=useState(false);
  const [showCountries,setShowCountries]=useState(false);
  const [showMessage,setShowMessage]=useState(false);
  const [showExtraInfo,setShowExtraInfo]=useState(false);
  const [country,setCountry]=useState({});
  const [currentSearchTerm,setCurrentSearchTerm]=useState('');

  useEffect(() =>{
    setCurrentSearchTerm(searchTerm);
  }
  ,[]);


  useEffect(() => {
    if(currentSearchTerm !== searchTerm){
      setShowExtraInfo(false);
      if(filteredCountries.length === 1){
        setShowCountry(true);
        setShowCountries(false);
        setShowMessage(false);
      }
      else if(filteredCountries.length <= 10 && filteredCountries.length >1){
        setShowCountries(true);
        setShowCountry(false);
        setShowMessage(false);
      }
    }
    if(filteredCountries.length === 1){
      setShowCountry(true);
      setShowCountries(false);
      setShowMessage(false);
    }else if(filteredCountries.length <= 10 && filteredCountries.length >1){
      setShowCountries(true);
      setShowCountry(false);
      setShowMessage(false);
    }else if(((filteredCountries.length > 10) || (filteredCountries.length<=1))){
      setShowMessage(true);
      setShowCountry(false);
      setShowCountries(false);
    }
  },[message,filteredCountries,currentSearchTerm,searchTerm]);

  const handleShowInfo = (country,e) => {
    setCountry(country);
    setShowExtraInfo(true);
    setShowMessage(false);
    setShowCountry(false);
    setShowCountries(false);
  }

  return(
    <>
      {showCountry && <Country country={filteredCountries[0]} />}
      {showCountries && filteredCountries.map(country => (
      <div key={country.name.common}>
        <p>{country.name.common}</p>
        <button onClick={handleShowInfo.bind(this,country)}>show info</button>
      </div>
      ))}
      {showMessage && <div>{message}</div>}
      {showExtraInfo && <Country country={country} />}
    </>
  );
}


export default DisplayResults;