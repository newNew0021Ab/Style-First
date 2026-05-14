import { useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StartScreen } from "./pages/StartScreen";
import { ChallengeScreen } from "./pages/ChallengeScreen";
import { LoadingScreen } from "./pages/LoadingScreen";
import { ResultScreen } from "./pages/ResultScreen";
import { GameOverScreen } from "./pages/GameOverScreen";
import { ExitConfirmDialog } from "./pages/ExitConfirmDialog";
import { getResult } from "./data/results";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

// Screens: 0=start, 1-8=challenges, 9=loading, 10=result, 11=gameover
function Game() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const directionRef = useRef<1 | -1>(1);

  const handleStart = () => {
    directionRef.current = 1;
    setCurrentScreen(1);
    setAnswers([]);
    setMistakes(0);
    setResult("");
  };

  const handleNext = (answer: string, isCorrect: boolean) => {
    directionRef.current = 1;
    const newAnswers = [...answers, answer];
    const newMistakes = isCorrect ? mistakes : mistakes + 1;

    setAnswers(newAnswers);
    setMistakes(newMistakes);

    if (newMistakes >= 3) {
      setCurrentScreen(11);
      return;
    }

    if (currentScreen < 8) {
      setCurrentScreen(currentScreen + 1);
    } else {
      setCurrentScreen(9);
      setTimeout(() => {
        setResult(getResult(newAnswers));
        setCurrentScreen(10);
      }, 1800);
    }
  };

  const handleExitRequest = () => {
    setShowExitConfirm(true);
  };

  const handleExitConfirm = () => {
    setShowExitConfirm(false);
    directionRef.current = -1;
    setCurrentScreen(0);
    setAnswers([]);
    setMistakes(0);
    setResult("");
  };

  const handleExitCancel = () => {
    setShowExitConfirm(false);
  };

  const handleRestart = () => {
    directionRef.current = 1;
    setCurrentScreen(0);
    setAnswers([]);
    setMistakes(0);
    setResult("");
  };

  const direction = directionRef.current;

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background overflow-hidden relative">
      <div className="w-full max-w-[480px] h-[100dvh] sm:h-[800px] sm:max-h-[100dvh] relative bg-background shadow-xl sm:rounded-[40px] overflow-hidden flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          {currentScreen === 0 && (
            <motion.div
              key="start"
              custom={direction}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <StartScreen onStart={handleStart} />
            </motion.div>
          )}

          {currentScreen >= 1 && currentScreen <= 8 && (
            <motion.div
              key={`challenge-${currentScreen}`}
              custom={direction}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <ChallengeScreen
                currentChallenge={currentScreen}
                mistakes={mistakes}
                onNext={handleNext}
                onExit={handleExitRequest}
              />
            </motion.div>
          )}

          {currentScreen === 9 && (
            <motion.div
              key="loading"
              custom={direction}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <LoadingScreen />
            </motion.div>
          )}

          {currentScreen === 10 && (
            <motion.div
              key="result"
              custom={direction}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <ResultScreen resultId={result} onRestart={handleRestart} />
            </motion.div>
          )}

          {currentScreen === 11 && (
            <motion.div
              key="gameover"
              custom={direction}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <GameOverScreen onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showExitConfirm && (
            <ExitConfirmDialog
              onConfirm={handleExitConfirm}
              onCancel={handleExitCancel}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const screenVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
  }),
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Game />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
