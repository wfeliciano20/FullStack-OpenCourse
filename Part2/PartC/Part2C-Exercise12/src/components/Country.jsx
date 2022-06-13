

const Country = ({country}) => {
  
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
    </div>
  )
}

export default Country;