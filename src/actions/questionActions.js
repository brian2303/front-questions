 const URL_BASE = 'https://api-questions-spring.herokuapp.com';
//const URL_BASE = 'http://localhost:8080';

export const LOADING = 'LOADING'
export const LOADED_SUCCESS = 'LOADED_SUCCESS'
export const LOADED_FAILURE = 'LOADED_FAILURE'
export const UPDATE_POSITION = 'UPDATE_POSITION'
export const UPDATE_LAST_ANSWER = "UPDATE_LAST_ANSWER"

export const loading = () => ({ type: LOADING })

export const success = payload => ({
  type: LOADED_SUCCESS,
  payload
});

export const updatePosition = payload => ({
  type: UPDATE_POSITION,
  payload
});

export const failure = () => ({ type: LOADED_FAILURE })

export const updateLastAnswer = payload => ({
  type: UPDATE_LAST_ANSWER,
  payload
})

export function fetchQuestions() {
  return async dispatch => {
    dispatch(loading())
    try {
      const response = await fetch(`${URL_BASE}/all`)
      const data = await response.json()
      dispatch(success({ questions: data, redirect: null }))
    } catch (error) {
      dispatch(failure())
    }
  }
}

export function fetchOwnerQuestions(userId) {
  return async dispatch => {
    dispatch(loading())
    try {
      const response = await fetch(`${URL_BASE}/questions/user/${userId}`)
      const data = await response.json()
      dispatch(success({ questions: data, redirect: null }))
    } catch (error) {
      dispatch(failure())
    }
  }
}

export function fetchQuestion(id) {
  return async dispatch => {
    dispatch(loading())
    try {
      const response = await fetch(`${URL_BASE}/question/${id}`)
      const data = await response.json()
      dispatch(success({ question: data, redirect: null }))
    } catch (error) {
      dispatch(failure())
    }
  }
}

export function postQuestion(question) {
  return async dispatch => {
    dispatch(loading())
    try {
      const response = await fetch(`${URL_BASE}/create`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(question)
        }
      )
      const id = await response.text()
      // pendig validate uri
      dispatch(success({ redirect: `/question/${id}` }));
    } catch (error) {
      dispatch(failure())
    }
  }
}

export function deleteQuestion(id) {
  return async dispatch => {
    dispatch(loading())
    try {
      await fetch(`${URL_BASE}/delete/${id}`,
        {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      dispatch(success({ redirect: `/list` }));
    } catch (error) {
      dispatch(failure())
    }
  }
}

export function fetchAnswersByUser(request) {
  return async dispatch => {
    try {
      const response = await fetch(`${URL_BASE}/fetch-answer-user`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        }
      )
      const data = await response.json()
      dispatch(success({ lastAnswer: data }));
    } catch (error) {
      dispatch(failure())
    }
  }
}

export function postAnswer(answer) {
  return async dispatch => {
    dispatch(loading())
    try {
      await fetch(`${URL_BASE}/answer`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(answer)
        }
      )
      dispatch(success({ redirect: `/question/${answer.questionId}` }));
    } catch (error) {
      dispatch(failure())
    }
  }
}





export function updateAnswers(answer) {
  return async dispatch => {
    try {
      const response = await fetch(`${URL_BASE}/update-position`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(answer)
        }
      )
      const data = await response.json()
      dispatch(success({ redirect: `/question/${answer.questionId}`, lastAnswer: data }))
    } catch (error) {
      dispatch(failure())
    }
  }
}



export const orderByPosition = (o1, o2) => {

  if (o1.position < o2.position) {
    return 1
  } else if (o1.position > o2.position) {
    return -1
  }
  return 0

}