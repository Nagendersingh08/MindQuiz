import { useQuiz } from "../context/QuizContext";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";

function getResultFeedback(score) {
  if (score === 0) return { image: img1, message: "You are Jon Snow because you know nothing." };
  if (score <= 5) return { image: img2, message: "Your IQ is lower than room temperature." };
  if (score <= 15)
    return { image: img3, message: "You are giving Nobita some tough competition." };
  if (score <= 30)
    return { image: img4, message: "You need a lot more practice." };
  if (score <= 40) return { image: img5, message: "Knows enough Java to argue with the interviewer." };
  if (score <= 45)
    return { image: img6, message: "So close, yet so far." };
  if (score <= 49)
    return { image: img7, message: "You are so close to a perfect score." };
  return { image: img8, message: "Perfect score! You are a true Java master." };
}

function FinishScreen() {
  const { points, highScore, dispatch, totalPoints: maxPoint } = useQuiz();
  const feedback = getResultFeedback(points);

  const percentage = (points / maxPoint) * 100;

  return (
    <>
      <p className="result">
        You scored <strong> {points} </strong> out of {maxPoint} (
        {Math.ceil(percentage)}%).
      </p>

      <p className="highscore">High score : {highScore}</p>

      <div className="result-feedback">
        <img src={feedback.image} alt="Quiz result" className="result-image" />
        <p>{feedback.message}</p>
      </div>

      <button
        className="btn btn-ui restart-button"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
      {/* <a
        href="https://www.linkedin.com/in/nagender-singh-3a60ba290"
        className="dev-text"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dev: Nagender Singh
      </a> */}
    </>
  );
}

export default FinishScreen;
