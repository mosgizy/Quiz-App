import React, { useState,useRef } from 'react'
import { useDispatch } from 'react-redux'
import { loadQuestion } from '../features/question'
import { fetchData } from '../functions/fetchApi'
import { useSelector } from 'react-redux'
import Loader from './Loader'

const baseUrl = `https://quizapi.io/api/v1/questions?apiKey=${process.env.REACT_APP_API_KEY}`

console.log(process.env.REACT_APP_API_KEY)

const Starter = () => {
  const dispatch = useDispatch()
  const {loading,displayQuestion} = useSelector((state) => state.question.value)
  const [parameters, setParameters] = useState({
    amount: 10, category: "", difficulty: "", tags: ""
  })
  const [tags, setTag] = useState(["DevOps", "Docker", "Javascript", "Kubernates", "HTML", "Laravel", "Mysql", "Linux", "Wordpress", "PHP"])
  const [tagCopy, setTagCopy] = useState(tags)
  const [error,setError] = useState(false)

  const tagRef = useRef(null)
  const tagsRef = useRef(null)
  
  const categories = ["linux","bash","uncategorized","sql","cms","devops","code"]

  // handle the submit of the form which fetch the api then load the question

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = `${baseUrl}&category=${parameters.category}&difficulty=${parameters.difficulty}&limit=${parameters.amount}&tags=${parameters.tags}`

    dispatch(loadQuestion({ questions: [], loading: true, displayQuestion: false }))
    fetchData(url).then(response => {
      response === "ERR_NETWORK" ? dispatch(loadQuestion({ questions: [], loading: false, displayQuestion: false })): dispatch(loadQuestion({questions:[...response],loading:false,displayQuestion:true}))

      response === "ERR_NETWORK" && setError(true)
    })
  }

  // get the parameters to pass to the api

  const getParameters = (name, value) => {
    setParameters(() => {
        return {
          ...parameters,
          [name]: value
        }
    })
  }

  // get tags which are passed to the api, why i did tag separately is because i want to make it searchable which will enable the user to just click on it to choose there prefrence

  const getTag = (search) => {
    setParameters(() => {
      return {
        ...parameters,
        tags:search
      }
    })

    console.log(search)
    const newTags = tags.filter(tag => tag.toLowerCase().indexOf(search) !== -1)
    setTag(() => [...newTags])
    console.log(newTags)
  }

  // if the tags a clicked on add them to the tagged choice, had to use a copy because when searched the array had been reduced to the single element which is searched for, so when the user clicked on the option the tagCopy is then set and use for the next filter

  const addTag = (tag) => {
    tagRef.current.innerHTML += `<span className="hell">${tag}</span>`
    const newTags = tagCopy.filter(item => item !== tag)
    setTag(() => [...newTags])
    setTagCopy(() => [...newTags])

    setParameters(() => {
      return {
        ...parameters,
        tags: ""
      }
    })
  }

  const showTags = (e) => {
    if (e.target === document.activeElement) {
      tagsRef.current.classList.toggle("hide")
    }
  }

  return (
    loading ? <Loader /> : <section className={`wrapper ${displayQuestion ? "hide" : "show"}`}>
      <h1 className='form-header'>setup quiz</h1>
      <form className='form'>
        <div className="input-wrapper">
          <label htmlFor="number-of-questions">number of questions</label>
          <input type="number" name='number-of-questions' id='number-of-questions' value={parameters.amount} onChange={(e) => getParameters("amount",e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="category">category</label>
          <select name="category" id="category" value={parameters.category} onChange={(e) => getParameters("category", e.target.value)}>
            <option value="any category" defaultValue>any category</option>
            {
              categories.map((category, index) => {
                return <option key={index} value="category" defaultValue>{ category}</option>
              })
            }
          </select>
        </div>

        <div className="input-wrapper">
          <label htmlFor="difficulty">difficulty</label>
          <select name="difficulty" id="difficulty" value={parameters.difficulty} onChange={(e) => getParameters("difficulty", e.target.value)}>
            <option value="any difficulty" defaultValue>any difficulty</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>

        <div className="input-wrapper">
          <label htmlFor="tags">tags</label>
          <div className="input-field">
            <div ref={tagRef} className="input-choice"></div>
            <input type="text" name='tags' id='tags' value={parameters.tags} onChange={(e) => getTag(e.target.value)} onClick={(e) => showTags(e)} />
          </div>
            <div ref={tagsRef} className="tag-wrapper hide">
              {
                tags.length > 0 ? tags.map((tag, index) => {
                  return <div key={index} onClick={() => addTag(tag)} className="tag-choice">{tag}</div>
                }) : <div> no choice to choose from</div>
              }
            </div>
        </div>

        <button className='btn submit' onClick={handleSubmit}>play now</button>
        <p className='error'>{error && "Network Error"}</p>
      </form>
    </section>
  )
}

export default Starter
