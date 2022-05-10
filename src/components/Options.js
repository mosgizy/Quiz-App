import React from 'react'

const Options = ({value,next,question}) => {
  return (
    <div>
          <button type='button' className='btn' onClick={() => next(value)}>{question[value]}</button>
    </div>
  )
}

export default Options
