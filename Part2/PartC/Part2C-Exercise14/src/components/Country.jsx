import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({country}) => {
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [weatherImg, setWeatherImg] = useState(null);

  useEffect(() => {
    const api_call = async () => {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      console.log(data);
      setWind(data.wind.speed);
      setTemperature(data.main.temp);
      setWeather(data.weather[0].description);
      setWeatherImg(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

    }
    api_call();
});
  
  return (
    <div>
      <h1>{`${country.name.common}`}</h1>
      <p><strong>{`Capital: `}</strong> {`${country.capital}`}</p>
      <p><strong>{`Area: `}</strong>{`${country.area}`}</p>
      <h2>languages</h2>
      <ul>
        {
          Object.entries(country.languages).map(
          ([key, language]) => <li key={language}>{language}</li>)
        }
      </ul> 
      <img src={country.flags.png} alt={country.name.common} width="200" />
      <div>
        <h2>Current Weather in {country.capital}</h2>
        <p><strong>{`Forecast: `}</strong> {`${weather}`}</p>
        <p><strong>{`Tempreature: `}</strong> {`${temperature} in celcius`}</p>
        <img src={weatherImg} alt={weather} width={'200px'} />

        <p><strong>{`Wind: `}</strong> {`${wind} in m/s`}</p>
      </div>
    </div>
  )
}

export default Country;