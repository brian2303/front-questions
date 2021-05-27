import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

import { PublicNavbar, PrivateNavbar } from './components/Navbar'
import HomePage from './pages/HomePage'
import SingleQuestionPage from './pages/SingleQuestionPage'
import QuestionsPage from './pages/QuestionsPage'
import QuestionFormPage from './pages/QuestionFormPage'
import AnswerFormPage from './pages/AnswerFormPage'
import OwnerQuestionsPage from './pages/OwnerQuestionsPage'
import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDbq7F8kr3WJCbJOKiSSGP-gD5gXRHg0pA",
  authDomain: "questions-app-46af0.firebaseapp.com",
  projectId: "questions-app-46af0",
  storageBucket: "questions-app-46af0.appspot.com",
  messagingSenderId: "792543485051",
  appId: "1:792543485051:web:39e1577bb7b8175909d6de",
  measurementId: "G-PJ3YREN3H9"
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  if (user?.uid) {
    localStorage.setItem("uid", user?.uid);
  }
  return (
    <Router>
      {user ?
        <>
          <PrivateNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage><SignOut /></HomePage>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/list" component={OwnerQuestionsPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/new" component={QuestionFormPage} />
            <Redirect to="/" />
          </Switch>
        </> :
        <>
          <PublicNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage><SignIn /></HomePage>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Redirect to="/" />
          </Switch>
        </>
      }
    </Router>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button className="button right" onClick={signInWithGoogle}>Sign in with google</button>;
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        className="button right"
        onClick={() => {
          localStorage.removeItem("uid");
          auth.signOut();
        }}
      >
        Sign out
      </button>
    )
  );
}


export default App;
