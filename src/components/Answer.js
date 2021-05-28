import React from 'react';
import { connect } from 'react-redux';
import { updateAnswers } from '../actions/questionActions'

const Answer = ({ answer, dispatch, questionId }) => {

  const incrementAnswer = (answerId) => {
    const answer = { questionId: questionId, answerId: answerId, action: "sum" }
    dispatch(updateAnswers(answer))
  }

  const decrementAnswer = (answerId) => {
    const answer = { questionId: questionId, answerId: answerId, action: "rest" }
    dispatch(updateAnswers(answer))
  }

  return (
    <aside className="answer">
      <p>{answer.answer}</p>
      <p>{answer.position}</p>
      <button onClick={() => { incrementAnswer(answer.id) }}> + </button>
      <button onClick={() => { decrementAnswer(answer.id) }}> - </button>
    </aside>
  )
}

export default connect()(Answer)