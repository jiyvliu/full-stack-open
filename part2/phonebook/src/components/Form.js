import React from 'react'

const Form = ({ nameValue, nameHandler, numberValue, numberHandler, clickHandler }) => (
    <form>
        <div>
            name: <input value={nameValue} onChange={nameHandler} />
        </div>
        <div>
            number: <input value={numberValue} onChange={numberHandler} />
        </div>
        <div>
            <button type="submit" onClick={clickHandler}>add</button>
        </div>
    </form>
)

export default Form