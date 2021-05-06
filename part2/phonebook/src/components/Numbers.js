import React from 'react'

const Numbers = ({ persons, filter, handleDelete }) => (
  persons.filter(person => (
    person.name.toLowerCase().includes(filter)
  )).map(person => (
    <div key={person.name}>
      {person.name} {person.number}
      <button name={person.name} id={person.id} onClick={handleDelete}>delete </button>
    </div>
  ))
)

export default Numbers