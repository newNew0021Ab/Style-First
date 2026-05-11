import { motion } from "framer-motion";
import { Palette } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#3D1A6E] text-white p-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-32 h-32 mb-8 relative"
      >
        <div className="absolute inset-0 border-8 border-dashed border-[#F5A623] rounded-full opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Palette className="w-16 h-16 text-[#FF6B6B]" />
        </div>
      </motion.div>

      <h2 className="text-3xl font-black text-[#FFF8F0] text-center mb-6">
        Считаем твой<br/>результат...
      </h2>

      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -15, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 0.6, 
              delay: i * 0.15,
              ease: "easeInOut"
            }}
            className="w-5 h-5 rounded-full"
            style={{
              backgroundColor: i === 0 ? "#FF6B6B" : i === 1 ? "#F5A623" : "#FFF8F0"
            }}
          />
        ))}
      </div>
    </div>
  );
}
