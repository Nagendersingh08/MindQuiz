import { useQuiz } from "./context/QuizContext.jsx";
import {
  Header,
  Error,
  StartScreen,
  Main,
  Loader,
  Questions,
  NextButton,
  Progress,
  FinishScreen,
  Footer,
  Timer,
} from "./components";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
