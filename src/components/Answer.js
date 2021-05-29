import React from 'react';
import { connect } from 'react-redux';
import { updateAnswers, updatePosition } from '../actions/questionActions'


const Answer = ({ answer, dispatch, questionId,lastQuestionAndwered }) => {
  const userId = localStorage.getItem("uid");

  const incrementAnswer = (answerId) => {

    if (questionId === lastQuestionAndwered.questionId){

      if(answerId !== lastQuestionAndwered.answerId){
        if(lastQuestionAndwered.action === "sum"){
          const answer = {questionId:questionId,answerId:lastQuestionAndwered.answerId,action:"rest"}
          dispatch(updateAnswers(answer))
        }else{
          const answer = {questionId:questionId,answerId:lastQuestionAndwered.answerId,action:"sum"}
          dispatch(updateAnswers(answer))
        }
      }else{
        return;
      }
    }
    
    const answer = { questionId: questionId, answerId: answerId, action: "sum" }
    dispatch(updateAnswers(answer))
  }

  const decrementAnswer = (answerId) => {

    if (questionId === lastQuestionAndwered.questionId){

      if(answerId !== lastQuestionAndwered.answerId){
        if(lastQuestionAndwered.action === "sum"){
          const answer = {questionId:questionId,answerId:lastQuestionAndwered.answerId,action:"rest"}
          dispatch(updateAnswers(answer))
        }else{
          const answer = {questionId:questionId,answerId:lastQuestionAndwered.answerId,action:"sum"}
          dispatch(updateAnswers(answer))
        }
      }else{
        return;
      }
    }
 
    const answer = { questionId: questionId, answerId: answerId, action: "rest" }
    dispatch(updateAnswers(answer))
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
lastQuestionAndwered : state.question.lastAnswer
})
export default connect(mapStateToProps)(Answer)