import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ question, excerpt, onDelete }) => (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <h2>{question.question}</h2>
    <p className="category-question">
      <strong>{question.category}</strong> - <small><strong>{question.type}</strong></small>
    </p>

    {onDelete && (
      <button className="button right" onClick={() => onDelete(question.id)}>Eliminar</button>
    )}
    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        Ver pregunta
      </Link>
    )}
  </article>
)