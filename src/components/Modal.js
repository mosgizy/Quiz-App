import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadQuestion } from '../features/question'
import { modalState } from '../features/modal'

const Modal = () => {
  const { percentage } = useSelector((state) => state.modal.value)
  const dispatch = useDispatch()

  const reset = () => {
    dispatch(loadQuestion({ questions: [], loading: false, displayQuestion: false }))
    dispatch(modalState({ modalDisplay: false, percentage: 0 }))
  }

  return (
    <div className='modal-wrapper'>
      <div className="overlay"></div>
      <div className='wrapper modal'>
        <h1 className='form-header'>congrats!</h1>
        <p className='result'>you answered <span className='form-header'>{percentage}%</span> of questions correctly</p>
        <button className='btn' onClick={() => reset()}>play again</button>
      </div>
    </div>
  )
}

export default Modal
