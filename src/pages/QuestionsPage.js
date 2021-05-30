import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {

  useEffect(() => {
    dispatch(fetchQuestions())
  }, [dispatch])

  const renderQuestions = () => {
    if (loading) return <p>Cargando pregunta...</p>
    if (hasErrors) return <p>No se puede mostrar las preguntas.</p>

    return questions.map(question => <Question key={question.id} question={question} excerpt />)
  }

  return (
    <section>
      <h1>Preguntas</h1>
      {renderQuestions()}
    </section>
  )
}

const mapStateToProps = state => ({
  loading: state.question.loading,
  questions: state.question.questions,
  hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)