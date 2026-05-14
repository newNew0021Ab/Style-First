import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface GameOverScreenProps {
  onRestart: () => void;
}

const floatingEmojis = ["🎨", "🖌️", "🖼️", "✨", "🌟"];

export function GameOverScreen({ onRestart }: GameOverScreenProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full p-6 text-center overflow-hidden relative"
      style={{ background: "#3D1A6E" }}
    >
      {/* Floating background emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${10 + i * 18}%`,
              bottom: "-10%",
              opacity: 0.18,
            }}
            animate={{ y: [0, -900] }}
            transition={{
              duration: 7 + i * 1.2,
              repeat: Infinity,
              delay: i * 0.9,
              ease: "linear",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">

        {/* Animated emoji */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 120, delay: 0.1 }}
          className="text-8xl mb-6 select-none"
          role="img"
          aria-label="расстроен"
        >
          😮
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p
            className="text-xs font-black uppercase tracking-widest mb-2"
            style={{ color: "#FF6B6B" }}
          >
            Миссия не выполнена
          </p>
          <h1
            className="text-3xl font-black leading-tight mb-5"
            style={{ color: "#FFF8F0" }}
          >
            Ой! Целых<br />3 ошибки 💔
          </h1>
        </motion.div>

        {/* Encouragement card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: "spring", bounce: 0.35 }}
          className="w-full rounded-3xl px-6 py-5 mb-8"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <p
            className="text-base font-bold leading-relaxed"
            style={{ color: "#FFF8F0" }}
          >
            Не расстраивайся — даже великие художники учились на ошибках!
            Ты уже почти настоящий искусствовед.
          </p>
          <p
            className="text-xl font-black mt-3"
            style={{ color: "#F5A623" }}
          >
            💪 Ещё разок — и победа твоя!
          </p>
        </motion.div>

        {/* Retry button */}
        <motion.button
          data-testid="button-restart"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-full py-5 rounded-2xl text-xl font-black flex items-center justify-center gap-3"
          style={{
            background: "#F5A623",
            color: "#3D1A6E",
            boxShadow: "0 6px 0 #c4841a",
          }}
        >
          <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
          Попробовать снова!
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs font-bold uppercase tracking-widest mt-6"
          style={{ color: "#FFF8F0", opacity: 0.3 }}
        >
          Детская выставка · ТРК TRINITI · Grekova_design_studio
        </motion.p>
      </div>
    </div>
  );
}
