import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is a already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new number</h2>
      <Form nameValue={newName} nameHandler={handleNewName}
        numberValue={newNumber} numberHandler={handleNewNumber}
        clickHandler={handleAddPerson} />
      <h2>Numbers</h2>
      <Numbers filter={filter} persons={persons} />
    </div>
  )
}

export default App