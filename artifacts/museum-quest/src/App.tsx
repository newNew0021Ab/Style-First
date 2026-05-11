import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StartScreen } from "./pages/StartScreen";
import { ChallengeScreen } from "./pages/ChallengeScreen";
import { LoadingScreen } from "./pages/LoadingScreen";
import { ResultScreen } from "./pages/ResultScreen";
import { getResult } from "./data/results";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

function Game() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string>("");

  const handleStart = () => {
    setCurrentScreen(1);
    setAnswers([]);
    setResult("");
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentScreen < 8) {
      setTimeout(() => setCurrentScreen(currentScreen + 1), 700);
    } else {
      setTimeout(() => {
        setCurrentScreen(9); // Loading screen
        setTimeout(() => {
          setResult(getResult(newAnswers));
          setCurrentScreen(10); // Result screen
        }, 1500);
      }, 700);
    }
  };

  const handleRestart = () => {
    setCurrentScreen(0);
    setAnswers([]);
    setResult("");
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background overflow-hidden relative">
      <div className="w-full max-w-[480px] h-[100dvh] sm:h-[800px] sm:max-h-[100dvh] relative bg-background shadow-xl sm:rounded-[40px] overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {currentScreen === 0 && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <StartScreen onStart={handleStart} />
            </motion.div>
          )}

          {currentScreen >= 1 && currentScreen <= 8 && (
            <motion.div
              key={`challenge-${currentScreen}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ChallengeScreen 
                currentChallenge={currentScreen} 
                onAnswer={handleAnswer} 
              />
            </motion.div>
          )}

          {currentScreen === 9 && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <LoadingScreen />
            </motion.div>
          )}

          {currentScreen === 10 && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute inset-0"
            >
              <ResultScreen resultId={result} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

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
