import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchAnswersByUser, fetchQuestion, updateAnswers } from '../actions/questionActions'

import { Question } from '../components/Question'
import Answer from '../components/Answer'
import { Link } from 'react-router-dom'
import { orderByPosition } from "../actions/questionActions"

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  redirect,
}) => {
  const { id } = match.params
  const userId = localStorage.getItem("uid");

  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id, redirect])

  useEffect(() => {
    dispatch(fetchAnswersByUser({ questionId: id, userId }))
  }, [id]);

  const renderQuestion = () => {
    return <Question question={question} />
  }

  const renderAnswers = () => {

    return (question.answers && question.answers.length) ?
      question.answers.sort(orderByPosition).map(answer => (
        <Answer key={answer.id} answer={answer} questionId={question.id} />
      )) : <p>Sin respuestas!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Responder
      </Link>}

      <h2>Respuestas</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  redirect: state.question.redirect
})

export default connect(mapStateToProps)(SingleQuestionPage)