import React from 'react'

const Numbers = ({ persons, filter }) => (
    persons.filter(person => (
        person.name.toLowerCase().includes(filter)
    )).map(person => (
        <div key={person.name}>{person.name} {person.number} </div>
    ))
)

export default Numbers