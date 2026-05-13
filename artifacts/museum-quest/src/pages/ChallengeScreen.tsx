import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, X, ArrowRight } from "lucide-react";
import { challenges } from "../data/challenges";

interface ChallengeScreenProps {
  currentChallenge: number;
  previousAnswer?: string;
  onNext: (answer: string) => void;
  onBack?: () => void;
  onExit: () => void;
}

export function ChallengeScreen({
  currentChallenge,
  previousAnswer,
  onNext,
  onBack,
  onExit,
}: ChallengeScreenProps) {
  const challenge = challenges[currentChallenge - 1];
  const [selectedChoice, setSelectedChoice] = useState<string | null>(
    previousAnswer ?? null
  );

  useEffect(() => {
    setSelectedChoice(previousAnswer ?? null);
  }, [currentChallenge, previousAnswer]);

  const handleNext = () => {
    if (!selectedChoice) return;
    onNext(selectedChoice);
  };

  const Icon = challenge.icon;
  const progress = (currentChallenge / 8) * 100;

  return (
    <div className="flex flex-col h-full w-full" style={{ background: "#FFF8F0" }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-2 shrink-0">
        {onBack ? (
          <motion.button
            data-testid="button-back"
            whileTap={{ scale: 0.88 }}
            onClick={onBack}
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "#F0E6FF", color: "#3D1A6E" }}
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
          </motion.button>
        ) : (
          <div className="w-11 h-11 shrink-0" />
        )}

        <div className="flex-1 flex flex-col gap-1">
          <span className="text-sm font-bold text-right" style={{ color: "#3D1A6E", opacity: 0.5 }}>
            {currentChallenge} / 8
          </span>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "#FFE8D6" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "#FF6B6B" }}
              initial={{ width: `${((currentChallenge - 1) / 8) * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          </div>
        </div>

        <motion.button
          data-testid="button-exit"
          whileTap={{ scale: 0.88 }}
          onClick={onExit}
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "#FFE8D6", color: "#FF6B6B" }}
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-2">
        <div className="flex flex-col items-center w-full max-w-md mx-auto pb-2">
          <motion.div
            key={currentChallenge}
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.45, duration: 0.5 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-md rotate-3"
            style={{ background: "#3D1A6E" }}
          >
            <Icon className="w-8 h-8 -rotate-3" style={{ color: "#F5A623" }} />
          </motion.div>

          <motion.h2
            key={`q-${currentChallenge}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-black text-center mb-4 leading-snug"
            style={{ color: "#3D1A6E" }}
          >
            {challenge.question}
          </motion.h2>

          {challenge.riddle && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="w-full rounded-2xl px-5 py-4 mb-5 text-center"
              style={{ background: "#F0E6FF" }}
            >
              <p
                className="text-base font-bold italic leading-relaxed whitespace-pre-line"
                style={{ color: "#3D1A6E" }}
              >
                {challenge.riddle}
              </p>
            </motion.div>
          )}

          <div className="w-full space-y-3">
            {challenge.choices.map((choice, index) => {
              const isSelected = selectedChoice === choice;
              return (
                <motion.button
                  key={index}
                  data-testid={`button-choice-${index}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.06 }}
                  onClick={() => setSelectedChoice(choice)}
                  className="w-full p-4 rounded-2xl text-base font-bold text-left flex items-center min-h-[60px] border-4 transition-colors"
                  style={{
                    background: isSelected ? "#3D1A6E" : "white",
                    borderColor: isSelected ? "#3D1A6E" : "#FFE8D6",
                    color: isSelected ? "white" : "#3D1A6E",
                    boxShadow: isSelected ? "0 4px 0 #1a0b30" : "0 4px 0 #FFE8D6",
                  }}
                >
                  <motion.div
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 mr-3"
                    style={{
                      borderColor: isSelected ? "rgba(255,255,255,0.4)" : "#FFE8D6",
                      background: isSelected ? "rgba(255,255,255,0.15)" : "transparent",
                    }}
                    animate={{ scale: isSelected ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 rounded-full bg-white"
                      />
                    )}
                  </motion.div>
                  <span>{choice}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom "Далее" button */}
      <div className="px-5 pb-6 pt-3 shrink-0">
        <motion.button
          data-testid="button-next"
          whileTap={selectedChoice ? { scale: 0.96 } : {}}
          onClick={handleNext}
          disabled={!selectedChoice}
          className="w-full py-5 rounded-2xl text-xl font-black flex items-center justify-center gap-3 transition-all"
          style={{
            background: selectedChoice ? "#F5A623" : "#FFE8D6",
            color: selectedChoice ? "#3D1A6E" : "#C4A882",
            boxShadow: selectedChoice ? "0 6px 0 #c4841a" : "none",
            cursor: selectedChoice ? "pointer" : "default",
          }}
        >
          {currentChallenge < 8 ? (
            <>Далее <ArrowRight className="w-5 h-5" strokeWidth={2.5} /></>
          ) : (
            <>Узнать результат <ArrowRight className="w-5 h-5" strokeWidth={2.5} /></>
          )}
        </motion.button>
      </div>
    </div>
  );
}
