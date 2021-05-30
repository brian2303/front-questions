import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateAnswers, updatePosition } from '../actions/questionActions'
import { useHistory } from "react-router-dom";

const Answer = ({ answer, dispatch, questionId, lastAnswer, redirect }) => {
  const userId = localStorage.getItem("uid");
  const history = useHistory();

  useEffect(() => {
    if (redirect) {
      history.push(redirect)
    }
  }, [redirect, history]);

  const incrementAnswer = (answerId) => {

    if (lastAnswer[0] !== undefined) {

      if (answerId !== lastAnswer[0].answerId) {
        const answer = { questionId: questionId, answerId: answerId, action: "sum", userId,update:false }
        dispatch(updateAnswers(answer))

        if (lastAnswer[0].action === "sum") {
          const answer = { questionId: questionId, answerId: lastAnswer[0].answerId, action: "rest", userId,update:true }
          dispatch(updateAnswers(answer))
        }
        if (lastAnswer[0].action === "rest") {
          const answer = { questionId: questionId, answerId: lastAnswer[0].answerId, action: "sum", userId,update:true }
          dispatch(updateAnswers(answer))
        }
      }
    } 
    else {
      const answer = { questionId: questionId, answerId: answerId, action: "sum", userId,update:false }
      dispatch(updateAnswers(answer))
    }


  }

  const decrementAnswer = (answerId) => {
   
    if (lastAnswer[0] !== undefined) {

      if (answerId !== lastAnswer[0].answerId) {
        const answer = { questionId: questionId, answerId: answerId, action: "rest", userId, update:false}
        dispatch(updateAnswers(answer))

        if (lastAnswer[0].action === "sum") {
          const answer = { questionId: questionId, answerId: lastAnswer[0].answerId, action: "rest", userId,update:true }
          dispatch(updateAnswers(answer))
        }
        if (lastAnswer[0].action === "rest") {
          const answer = { questionId: questionId, answerId: lastAnswer[0].answerId, action: "sum", userId,update:true}
          dispatch(updateAnswers(answer))
        }
      }
    } 
    else {
      const answer = { questionId: questionId, answerId: answerId, action: "rest", userId,update:false }
      dispatch(updateAnswers(answer))
    }
  }

  return (
    <aside className="answer">
      <p>{answer.answer}</p>
      <p>{answer.position}</p>
      {userId &&
        <>
          <button onClick={() => { incrementAnswer(answer.id) }}> + </button>
          <button onClick={() => { decrementAnswer(answer.id) }}> - </button>
        </>
      }

    </aside>
  )
}
const mapStateToProps = state => ({
  redirect: state.question.redirect,
  lastAnswer: state.question.lastAnswer

})
export default connect(mapStateToProps)(Answer)