import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchInput = ({ filter, filterHandler }) => (
  <div>
    find countries <input value={filter} onChange={filterHandler} />
  </div>
)

const Countries = ({ filtered, selectHandler, weather }) => {

  if (filtered.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filtered.length > 1) {
    return (
      <div>
        {filtered.map(country =>
          <div key={country.name}>
            {country.name}
            <button key={'B' + country.name} onClick={selectHandler} name={country.name}>
              show
            </button>
          </div>
        )}
      </div>
    )
  } else if (filtered.length === 1) {
    const country = filtered[0]

    return (
      <div>
        <h2>{country.name} </h2>
        <div>capital {country.capital} </div>
        <div>population {country.population} </div>
        <h3>Languages </h3>
        <div>
          {country.languages.map(language => (
            <li key={language.name}> {language.name} </li>
          ))}
        </div>
        <img src={country.flag} alt='flag of country' width='500'></img>
        <h3>Weather in {country.capital} </h3>
        <div><b>temperature:</b> {weather.temperature} Celsius</div>
        <div><img src={weather.weather_icon} alt='weather icon' /></div>
        <div><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_direction}</div>
      </div>
    )
  } else {
    return (
      <div>
        no results
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState({
    temperature: 0,
    weather_icon: '',
    wind_speed: 0,
    wind_direction: ''
  })
  const [filtered, setFiltered] = useState([])

  const filterHandler = (event) => {
    setFilter(event.target.value)
    setFiltered(countries.filter(country => (
      country.name.toLowerCase().includes(filter.toLowerCase()))))
  }

  const selectHandler = (event) => {
    setFilter(event.target.name)
    setFiltered(countries.filter(country => (
      country.name.toLowerCase().includes(filter.toLowerCase()))))
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (filtered.length === 1) {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${filtered[0].capital}`)
        .then(response => {
          setWeather({
            temperature: response.data.current.temperature,
            weather_icon: response.data.current.weather_icons[0],
            wind_speed: response.data.current.wind_speed,
            wind_direction: response.data.current.wind_direction
          })
        })
    }
  }, [filtered, filter])

  return (
    <div >
      <SearchInput filter={filter} filterHandler={filterHandler} />
      <Countries filtered={filtered}
        selectHandler={selectHandler} weather={weather} />
    </div>
  );
}

export default App;
