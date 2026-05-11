import { useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StartScreen } from "./pages/StartScreen";
import { ChallengeScreen } from "./pages/ChallengeScreen";
import { LoadingScreen } from "./pages/LoadingScreen";
import { ResultScreen } from "./pages/ResultScreen";
import { ExitConfirmDialog } from "./pages/ExitConfirmDialog";
import { getResult } from "./data/results";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

function Game() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string>("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const directionRef = useRef<1 | -1>(1);

  const handleStart = () => {
    directionRef.current = 1;
    setCurrentScreen(1);
    setAnswers([]);
    setResult("");
  };

  const handleNext = (answer: string) => {
    directionRef.current = 1;
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

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

  const handleBack = () => {
    directionRef.current = -1;
    if (currentScreen > 1) {
      setAnswers(answers.slice(0, -1));
      setCurrentScreen(currentScreen - 1);
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
    setResult("");
  };

  const handleExitCancel = () => {
    setShowExitConfirm(false);
  };

  const handleRestart = () => {
    directionRef.current = 1;
    setCurrentScreen(0);
    setAnswers([]);
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
                previousAnswer={answers[currentScreen - 1]}
                onNext={handleNext}
                onBack={currentScreen > 1 ? handleBack : undefined}
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
    transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
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
