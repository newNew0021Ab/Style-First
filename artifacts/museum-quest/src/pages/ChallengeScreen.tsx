import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Heart } from "lucide-react";
import { challenges } from "../data/challenges";

const MAX_MISTAKES = 3;

interface ChallengeScreenProps {
  currentChallenge: number;
  mistakes: number;
  onNext: (answer: string, isCorrect: boolean) => void;
  onExit: () => void;
}

export function ChallengeScreen({
  currentChallenge,
  mistakes,
  onNext,
  onExit,
}: ChallengeScreenProps) {
  const challenge = challenges[currentChallenge - 1];
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [justWrong, setJustWrong] = useState(false);

  useEffect(() => {
    setSelectedChoice(null);
    setConfirmed(false);
    setJustWrong(false);
  }, [currentChallenge]);

  const isCorrect = selectedChoice === challenge.correctAnswer;
  // Include the pending mistake in the displayed count before it's committed to App state
  const displayMistakes = mistakes + (justWrong ? 1 : 0);
  const livesLeft = MAX_MISTAKES - displayMistakes;

  const handleConfirm = () => {
    if (!selectedChoice) return;
    setConfirmed(true);
    if (selectedChoice !== challenge.correctAnswer) {
      setJustWrong(true);
    }
  };

  const handleNext = () => {
    if (!selectedChoice || !confirmed) return;
    onNext(selectedChoice, isCorrect);
  };

  const Icon = challenge.icon;
  const progress = (currentChallenge / 8) * 100;

  const getChoiceStyle = (choice: string) => {
    const isSelected = selectedChoice === choice;
    const isThisCorrect = choice === challenge.correctAnswer;

    if (!confirmed) {
      return {
        background: isSelected ? "#3D1A6E" : "white",
        borderColor: isSelected ? "#3D1A6E" : "#FFE8D6",
        color: isSelected ? "white" : "#3D1A6E",
        boxShadow: isSelected ? "0 4px 0 #1a0b30" : "0 4px 0 #FFE8D6",
      };
    }

    if (isThisCorrect) {
      return {
        background: "#E8F5E9",
        borderColor: "#4CAF50",
        color: "#2E7D32",
        boxShadow: "0 4px 0 #388E3C",
      };
    }

    if (isSelected && !isThisCorrect) {
      return {
        background: "#FFEBEE",
        borderColor: "#EF9A9A",
        color: "#C62828",
        boxShadow: "0 4px 0 #EF9A9A",
      };
    }

    return {
      background: "white",
      borderColor: "#FFE8D6",
      color: "#3D1A6E",
      opacity: 0.4,
      boxShadow: "0 4px 0 #FFE8D6",
    };
  };

  const getCircleStyle = (choice: string) => {
    const isSelected = selectedChoice === choice;
    const isThisCorrect = choice === challenge.correctAnswer;

    if (!confirmed) {
      return {
        borderColor: isSelected ? "rgba(255,255,255,0.4)" : "#FFE8D6",
        background: isSelected ? "rgba(255,255,255,0.15)" : "transparent",
      };
    }
    if (isThisCorrect) return { borderColor: "#4CAF50", background: "#4CAF50" };
    if (isSelected && !isThisCorrect) return { borderColor: "#EF9A9A", background: "#EF9A9A" };
    return { borderColor: "#FFE8D6", background: "transparent" };
  };

  return (
    <div className="flex flex-col h-full w-full" style={{ background: "#FFF8F0" }}>

      {/* Top bar — unified HUD card */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ background: "#F0E6FF" }}
        >
          {/* Hearts */}
          <div className="flex items-center gap-1.5 shrink-0">
            {[0, 1, 2].map((i) => {
              const heartIsLost = i >= livesLeft;
              const isJustNowLost = heartIsLost && justWrong && i === MAX_MISTAKES - mistakes - 1;
              return (
                <motion.div
                  key={`heart-${i}-${heartIsLost}`}
                  initial={isJustNowLost ? { scale: 1.6, rotate: -25 } : { scale: 1 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
                >
                  <Heart
                    className="w-7 h-7"
                    style={{
                      color: heartIsLost ? "#C4B5D4" : "#FF6B6B",
                      fill: heartIsLost ? "#C4B5D4" : "#FF6B6B",
                      transition: "fill 0.3s ease, color 0.3s ease",
                    }}
                    strokeWidth={0}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px self-stretch rounded-full mx-1" style={{ background: "#3D1A6E", opacity: 0.15 }} />

          {/* Progress */}
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black" style={{ color: "#3D1A6E", opacity: 0.4 }}>
                Вопрос
              </span>
              <span className="text-xs font-black" style={{ color: "#3D1A6E" }}>
                {currentChallenge} / 8
              </span>
            </div>
            <div
              className="w-full h-2.5 rounded-full overflow-hidden"
              style={{ background: "rgba(61,26,110,0.12)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#3D1A6E" }}
                initial={{ width: `${((currentChallenge - 1) / 8) * 100}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-px self-stretch rounded-full mx-1" style={{ background: "#3D1A6E", opacity: 0.15 }} />

          {/* Exit */}
          <motion.button
            data-testid="button-exit"
            whileTap={{ scale: 0.85 }}
            onClick={onExit}
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,107,107,0.15)", color: "#FF6B6B" }}
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>

      {/* Warning strip when 1 life left */}
      <AnimatePresence>
        {livesLeft === 1 && confirmed && !isCorrect && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-5 mb-1 rounded-xl px-4 py-2 text-center text-sm font-black"
            style={{ background: "#FFEBEE", color: "#C62828" }}
          >
            ⚠️ Осторожно! Осталась последняя попытка!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-2">
        <div className="flex flex-col items-center w-full max-w-md mx-auto pb-2">

          {/* Icon */}
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

          {/* Question */}
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

          {/* Riddle */}
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

          {/* Choices */}
          <div className="w-full space-y-3">
            {challenge.choices.map((choice, index) => {
              const isSelected = selectedChoice === choice;
              const isThisCorrect = choice === challenge.correctAnswer;
              const choiceStyle = getChoiceStyle(choice);
              const circleStyle = getCircleStyle(choice);

              return (
                <motion.button
                  key={index}
                  data-testid={`button-choice-${index}`}
                  whileHover={!confirmed ? { scale: 1.02 } : {}}
                  whileTap={!confirmed ? { scale: 0.96 } : {}}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.06 }}
                  onClick={() => { if (!confirmed) setSelectedChoice(choice); }}
                  className="w-full p-4 rounded-2xl text-base font-bold text-left flex items-center min-h-[60px] border-4 transition-all"
                  style={{ ...choiceStyle, cursor: confirmed ? "default" : "pointer" }}
                >
                  <motion.div
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 mr-3"
                    style={circleStyle}
                    animate={confirmed && isThisCorrect ? { scale: [1, 1.25, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {confirmed && isThisCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 0.3 }}
                      >
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                    {confirmed && isSelected && !isThisCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 0.3 }}
                      >
                        <X className="w-4 h-4 text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                    {!confirmed && isSelected && (
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

          {/* Feedback message */}
          <AnimatePresence>
            {confirmed && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.12, type: "spring", bounce: 0.4 }}
                className="w-full mt-4 px-5 py-4 rounded-2xl text-center font-black text-base"
                style={{
                  background: isCorrect ? "#E8F5E9" : "#FFEBEE",
                  color: isCorrect ? "#2E7D32" : "#C62828",
                  border: `2px solid ${isCorrect ? "#4CAF50" : "#EF9A9A"}`,
                }}
              >
                {isCorrect
                  ? "Правильно! Молодец! 🎉"
                  : `Правильный ответ: ${challenge.correctAnswer}`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="px-5 pb-6 pt-3 shrink-0 flex flex-col gap-3">
        <AnimatePresence>
          {!confirmed && selectedChoice && (
            <motion.button
              data-testid="button-confirm"
              key="confirm-btn"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.35 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleConfirm}
              className="w-full py-5 rounded-2xl text-xl font-black flex items-center justify-center gap-3"
              style={{
                background: "#3D1A6E",
                color: "white",
                boxShadow: "0 6px 0 #1a0b30",
              }}
            >
              <Check className="w-5 h-5" strokeWidth={2.5} />
              Подтвердить
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {confirmed && (
            <motion.button
              data-testid="button-next"
              key="next-btn"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.35, delay: 0.25 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleNext}
              className="w-full py-5 rounded-2xl text-xl font-black flex items-center justify-center gap-3"
              style={{
                background: "#F5A623",
                color: "#3D1A6E",
                boxShadow: "0 6px 0 #c4841a",
              }}
            >
              {currentChallenge < 8 ? (
                <>Далее <ArrowRight className="w-5 h-5" strokeWidth={2.5} /></>
              ) : (
                <>Узнать результат <ArrowRight className="w-5 h-5" strokeWidth={2.5} /></>
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {!confirmed && !selectedChoice && (
          <div
            className="w-full py-5 rounded-2xl text-xl font-black flex items-center justify-center"
            style={{ background: "#FFE8D6", color: "#C4A882", cursor: "default" }}
          >
            Выбери ответ
          </div>
        )}
      </div>
    </div>
  );
}
