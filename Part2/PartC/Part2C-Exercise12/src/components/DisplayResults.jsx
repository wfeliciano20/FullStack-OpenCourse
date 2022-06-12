import { useState, useEffect } from 'react';
import Country from './Country';

const DisplayResults = ({message,filteredCountries}) => {

  const [showCountry,setShowCountry]=useState(false);
  const [showCountries,setShowCountries]=useState(false);
  const [showMessage,setShowMessage]=useState(false);

  useEffect(() => {
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
  },[message,filteredCountries]);

  return(
    <>
      {showCountry && <Country country={filteredCountries[0]} />}
      {showCountries && filteredCountries.map(country => (
      <div key={country.name.common}>
        {country.name.common}
      </div>
      ))}
      {showMessage && <div>{message}</div>}
    </>
  );
}


export default DisplayResults;