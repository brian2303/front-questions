import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateAnswers, updatePosition } from '../actions/questionActions'
import { useHistory } from "react-router-dom";
import {faThumbsUp,faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Answer = ({ answer, dispatch, questionId, lastAnswer, redirect }) => {
  const userId = localStorage.getItem("uid");
  const history = useHistory();

  useEffect(() => {
    if (redirect) {
      history.push(redirect)
    }
  }, [redirect, history]);

  const validateBeforeAnswer=(beforeAnswer) =>{

    if (beforeAnswer.action === "sum") {
      const answer = { questionId: questionId, answerId: beforeAnswer.answerId, action: "rest", userId,update:true }
      dispatch(updateAnswers(answer))
    }
    if (beforeAnswer.action === "rest") {
      const answer = { questionId: questionId, answerId: beforeAnswer.answerId, action: "sum", userId,update:true}
      dispatch(updateAnswers(answer))
    }

  }

  const actionUpdate = (action,answerId)=>{
    const answer = { questionId: questionId, answerId: answerId, action: action, userId,update:false }
    dispatch(updateAnswers(answer))

  }


  const incrementAnswer = (answerId) => {
    const beforeAnswer = lastAnswer[0]

    if (beforeAnswer !== undefined) {

      if (answerId !== beforeAnswer.answerId) {
        actionUpdate("sum",answerId)
        validateBeforeAnswer(beforeAnswer) 
      }
    } 
    else {
      actionUpdate("sum",answerId)
     
    }
  }


  const decrementAnswer = (answerId) => {

  const beforeAnswer= lastAnswer[0]
   
    if (beforeAnswer !== undefined) {

      if (answerId !== beforeAnswer.answerId) {
        actionUpdate("rest",answerId)
        validateBeforeAnswer(beforeAnswer)  
      }
    } 
    else {
      actionUpdate("rest",answerId)
    }
  }

  return (
    <aside className="answer">
      <p>{answer.answer}</p>
      <p>{answer.position}</p>
      
      {userId &&
        <>
          <button onClick={() => { incrementAnswer(answer.id) }}> <FontAwesomeIcon icon= {faThumbsUp} /> </button>
          <button onClick={() => { decrementAnswer(answer.id) }}> <FontAwesomeIcon icon= {faThumbsDown} /> </button>
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