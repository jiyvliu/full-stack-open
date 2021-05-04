import React, { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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