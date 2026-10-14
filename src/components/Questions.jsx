import { useQuiz } from "../context/QuizContext";

function Questions() {
  const { questions, index } = useQuiz();

  const question = questions.at(index);
  const isCodeQuestion = question.question.includes("\n");

  return (
    <div>
      <h3 className={isCodeQuestion ? "question-code" : ""}>
        {question.question}
      </h3>
      <Options
        options={question.options}
        correctOption={question.correctOption}
      />
    </div>
  );
}

function Options({ options, correctOption }) {
  const { answer, dispatch } = useQuiz();

  const isAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, i) => (
        <button
          className={`btn btn-option ${answer === i ? "answer" : ""} ${
            isAnswered && i === correctOption ? "correct" : ""
          } ${
            isAnswered && answer === i && answer !== correctOption
              ? "wrong"
              : ""
          } `}
          disabled={isAnswered}
          key={option}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: i });
          }}
        >
          {" "}
          {option}{" "}
        </button>
      ))}
    </div>
  );
}

export default Questions;
