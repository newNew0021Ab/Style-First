import { motion } from "framer-motion";
import { results } from "../data/results";
import { RotateCcw, Star } from "lucide-react";

interface ResultScreenProps {
  resultId: string;
  onRestart: () => void;
}

export function ResultScreen({ resultId, onRestart }: ResultScreenProps) {
  const result = results.find(r => r.id === resultId) || results[4];

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full p-6 text-center overflow-y-auto relative"
      style={{ background: "#FFF8F0" }}
    >
      {/* Floating stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: [0, 1, 0], y: -400, x: (i % 2 === 0 ? 1 : -1) * (20 + i * 18) }}
            transition={{
              duration: 2.8 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
            className="absolute bottom-0 left-1/2"
          >
            <Star
              className="w-5 h-5"
              style={{ color: i % 3 === 0 ? "#F5A623" : i % 3 === 1 ? "#FF6B6B" : "#C084FC" }}
              fill={i % 3 === 0 ? "#F5A623" : i % 3 === 1 ? "#FF6B6B" : "#C084FC"}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100 }}
        className="w-36 h-36 rounded-full flex items-center justify-center shadow-2xl mb-6 border-8 border-white relative z-10"
        style={{ background: result.color }}
      >
        <span className="text-6xl leading-none" role="img" aria-label={result.title}>
          {result.emoji}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="relative z-10 max-w-sm"
      >
        <p
          className="text-sm font-bold uppercase tracking-widest mb-2"
          style={{ color: "#FF6B6B" }}
        >
          Твоё звание:
        </p>
        <h1
          className="text-3xl md:text-4xl font-black mb-4 leading-tight"
          style={{ color: "#3D1A6E" }}
        >
          {result.title}
        </h1>
        <p
          className="text-base font-bold mb-3 leading-relaxed"
          style={{ color: "#3D1A6E", opacity: 0.7 }}
        >
          {result.description}
        </p>

        <p
          className="text-xs font-bold uppercase tracking-widest mb-10"
          style={{ color: "#3D1A6E", opacity: 0.35 }}
        >
          Детская выставка · ТРК TRINITI
        </p>

        <motion.button
          data-testid="button-restart"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRestart}
          className="w-full py-5 rounded-2xl text-lg font-black flex items-center justify-center gap-3"
          style={{
            background: "#3D1A6E",
            color: "white",
            boxShadow: "0 6px 0 #1a0b30",
          }}
        >
          <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
          Пройти снова
        </motion.button>
      </motion.div>
    </div>
  );
}
