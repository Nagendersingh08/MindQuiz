import { createContext, useContext, useEffect, useReducer } from "react";
import questionsData from "../data/questions.json";

/* eslint-disable react-refresh/only-export-components */

const QuizContext = createContext();

const QUIZ_TIME_SECONDS = 15 * 60;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeleft: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataField":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timeleft: QUIZ_TIME_SECONDS,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore: Math.max(state.highScore, state.points),
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        highScore: state.highScore,
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        timeleft: state.timeleft - 1,
        status: state.timeleft === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, timeleft },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchQuestion() {
      try {
        setTimeout(function () {
          dispatch({ type: "dataReceved", payload: questionsData.questions });
        }, 500);
      } catch (e) {
        dispatch({ type: "dataField" });
        console.log(e);
      }
    }

    fetchQuestion();
  }, []);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (curr_points, question) => curr_points + question.points,
    0
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        timeleft,
        dispatch,
        numQuestions,
        totalPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("Quiz Context use outside of QuizProvider.");
  }
  return context;
}

export { QuizProvider, useQuiz };
