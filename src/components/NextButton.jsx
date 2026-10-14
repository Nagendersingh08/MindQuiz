import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { dispatch, questions, index, numQuestions } = useQuiz();
  const question = questions[index];

  if (!question) return;
  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    );
  }

  if (index == numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finish" });
        }}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
