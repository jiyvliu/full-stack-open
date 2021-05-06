import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    phonebookService.getAll().then(data => {
      setPersons(data)
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

  const handleDelete = (event) => {
    if (window.confirm(`Delete ${event.target.name}?`)) {
      phonebookService.remove(event.target.id)
        .then(() => {
          setPersons(persons.filter(person => person.name !== event.target.name))
        })
    }
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is a already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        phonebookService
          .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
          .then(data => {
            const filtered = persons.filter(person => person.name !== newName)
            return setPersons(filtered.concat(data))
          })
      }
    } else {
      phonebookService
        .create({ name: newName, number: newNumber })
        .then(data => setPersons(persons.concat(data)))
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
      <Numbers filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App