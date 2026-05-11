import { useState } from "react";
import { motion } from "framer-motion";
import { challenges } from "../data/challenges";

interface ChallengeScreenProps {
  currentChallenge: number;
  onAnswer: (answer: string) => void;
}

export function ChallengeScreen({ currentChallenge, onAnswer }: ChallengeScreenProps) {
  const challenge = challenges[currentChallenge - 1];
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    if (selectedChoice) return; // Prevent multiple clicks
    setSelectedChoice(choice);
    onAnswer(choice);
  };

  const Icon = challenge.icon;

  return (
    <div className="flex flex-col h-full w-full bg-[#FFF8F0] p-6 relative">
      {/* Progress Bar */}
      <div className="w-full flex items-center justify-between mb-8 mt-4">
        <span className="text-[#3D1A6E] font-bold text-lg">
          {currentChallenge} / 8 заданий
        </span>
        <div className="flex-1 ml-4 h-4 bg-[#FFE8D6] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#FF6B6B] rounded-full"
            initial={{ width: `${((currentChallenge - 1) / 8) * 100}%` }}
            animate={{ width: `${(currentChallenge / 8) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-24 h-24 bg-[#3D1A6E] rounded-3xl rotate-3 flex items-center justify-center mb-8 shadow-lg"
        >
          <Icon className="w-12 h-12 text-[#F5A623] -rotate-3" />
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-black text-center text-[#3D1A6E] mb-12 leading-tight">
          {challenge.question}
        </h2>

        <div className="w-full space-y-4">
          {challenge.choices.map((choice, index) => {
            const isSelected = selectedChoice === choice;
            return (
              <motion.button
                key={index}
                whileHover={!selectedChoice ? { scale: 1.02 } : {}}
                whileTap={!selectedChoice ? { scale: 0.95 } : {}}
                onClick={() => handleSelect(choice)}
                className={`w-full p-5 rounded-2xl text-xl font-bold text-left transition-all relative overflow-hidden flex items-center min-h-[80px] border-4
                  ${isSelected 
                    ? "bg-[#F5A623] border-[#c4841a] text-[#3D1A6E] shadow-[0_4px_0_#c4841a]" 
                    : "bg-white border-[#FFE8D6] text-[#3D1A6E] shadow-[0_4px_0_#FFE8D6] hover:border-[#FF6B6B]"
                  }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="outline"
                    className="absolute inset-0 bg-[#F5A623] z-0"
                    initial={false}
                    animate={{ backgroundColor: "#F5A623" }}
                  />
                )}
                <span className="relative z-10">{choice}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
