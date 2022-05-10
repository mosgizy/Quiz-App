import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Options from './Options'
import { modalState } from '../features/modal'

const Questions = () => {
    const { questions } = useSelector((state) => state.question.value)
    const dispatch = useDispatch()
    const [correctAnswers,setCorrectAnswers] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({ answers: { key: "value"
}})

    const checkAnswer = (answer="") => {
        if (answer === currentQuestion.correct_answer && answer !== "") {
            setCorrectAnswers((state) => [...state,answer])
        }
    }
    
    const nextQuestion = (answer) => {
        setCurrentIndex((state) => state + 1)
        checkAnswer(answer)
        if (currentIndex === questions.length-1) {
            let percent = Math.round((correctAnswers.length / questions.length) * 100)
            dispatch(modalState({modalDisplay:true,percentage:percent}))
        }
    }
    
    useEffect(() => {
        setCurrentQuestion(() => {
            return {
                ...currentQuestion, ...questions[currentIndex]
            }
        })
    },[questions,currentIndex])

    return (
        <section className='wrapper question-wrapper'>
            <aside className='score'>
                <p>Correct answers: { correctAnswers.length}/{currentIndex} </p>
            </aside>
            <div className="questions-wrapper">
                <h1 className="question">
                    {currentQuestion.question}
                </h1>
                <div className="options-wrapper">
                    {
                        questions && Object.keys(currentQuestion.answers).map((answer, index) => {
                            return currentQuestion.answers[answer] && <Options key = { index } value = { answer } next={nextQuestion} question={currentQuestion.answers} />
                        })
                    }
                </div>
            </div>
            <div className="btn-wrapper">
                <button className='btn' onClick={() => nextQuestion()}>next question</button>
            </div>
        </section>
    )
}

export default Questions
