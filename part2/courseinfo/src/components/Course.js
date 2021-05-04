import React from 'react'

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => (s + p.exercises), 0)

    return (
        <p><b>total of {total} exercises </b></p>
    ) 
}

const Part = ({ part }) => (
    <li key={'C' + part.id}>{part.name} {part.exercises}</li>
    )

    const Content = ({ parts }) => {
    return (
        <div>
        {parts.map(part => <Part key={'P' + part.id} part={part} />)}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

export default Course