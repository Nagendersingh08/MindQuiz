import { useQuiz } from "../context/QuizContext.jsx";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to Java Quiz</h2>
      <h3>{numQuestions || ""} Questions to test your Knowledge.</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
