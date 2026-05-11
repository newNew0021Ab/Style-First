import { motion } from "framer-motion";
import { Sparkles, Palette } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#3D1A6E] text-white p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-1/4 left-8 text-4xl"
        >
          🎨
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-10 text-4xl"
        >
          ✨
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 left-12 text-3xl"
        >
          🖼️
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, 15, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-12 text-4xl"
        >
          🖌️
        </motion.div>
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
        className="z-10 flex flex-col items-center text-center max-w-sm"
      >
        <div className="w-32 h-32 bg-[#FF6B6B] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,107,107,0.5)] mb-8 border-4 border-[#F5A623]">
          <Palette className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md text-[#F5A623]">
          Музейная<br/>миссия
        </h1>
        <p className="text-xl md:text-2xl font-bold mb-12 text-[#FFF8F0] opacity-90">
          Ты — исследователь искусства
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-[#F5A623] hover:bg-[#ffb53b] text-[#3D1A6E] text-2xl font-black py-5 px-10 rounded-full shadow-[0_8px_0_#c4841a] transition-colors w-full max-w-[300px] flex items-center justify-center gap-3"
        >
          <Sparkles className="w-6 h-6" />
          Начать игру
        </motion.button>
      </motion.div>
    </div>
  );
}
