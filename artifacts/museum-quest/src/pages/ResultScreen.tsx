import { motion } from "framer-motion";
import { results } from "../data/results";
import { RotateCcw, Award, Star } from "lucide-react";

interface ResultScreenProps {
  resultId: string;
  onRestart: () => void;
}

export function ResultScreen({ resultId, onRestart }: ResultScreenProps) {
  const result = results.find(r => r.id === resultId) || results[0];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#FFF8F0] p-6 text-center overflow-y-auto">
      {/* Confetti / Sparkles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100, x: (Math.random() - 0.5) * 200 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: -500, 
              x: (Math.random() - 0.5) * 300,
              rotate: Math.random() * 360
            }}
            transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            className="absolute bottom-0 left-1/2"
          >
            <Star className="w-6 h-6 text-[#F5A623]" fill="#F5A623" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100 }}
        className="w-40 h-40 rounded-full flex items-center justify-center shadow-2xl mb-8 border-8 border-white relative z-10"
        style={{ backgroundColor: result.color }}
      >
        <Award className="w-20 h-20 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 max-w-sm"
      >
        <p className="text-xl font-bold text-[#FF6B6B] mb-2 uppercase tracking-wider">
          Твоё звание:
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#3D1A6E] mb-6 leading-tight">
          {result.title}
        </h1>
        <p className="text-xl font-bold text-[#3D1A6E] opacity-80 mb-12">
          {result.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="bg-[#3D1A6E] hover:bg-[#2c1352] text-white text-xl font-bold py-5 px-8 rounded-full shadow-[0_6px_0_#1a0b30] transition-colors w-full flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-6 h-6" />
          Пройти снова
        </motion.button>
      </motion.div>
    </div>
  );
}
