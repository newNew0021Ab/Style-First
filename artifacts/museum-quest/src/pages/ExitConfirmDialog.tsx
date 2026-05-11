import { motion } from "framer-motion";
import { Home, X } from "lucide-react";

interface ExitConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitConfirmDialog({ onConfirm, onCancel }: ExitConfirmDialogProps) {
  return (
    <motion.div
      key="exit-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-50 flex items-end justify-center pb-0"
      style={{ background: "rgba(61,26,110,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-[32px] p-7 flex flex-col gap-5"
        style={{ background: "#FFF8F0" }}
      >
        <div className="text-center">
          <p
            className="text-2xl font-black mb-2"
            style={{ color: "#3D1A6E" }}
          >
            Выйти из игры?
          </p>
          <p
            className="text-base font-bold"
            style={{ color: "#3D1A6E", opacity: 0.55 }}
          >
            Твой прогресс будет потерян
          </p>
        </div>

        <motion.button
          data-testid="button-exit-confirm"
          whileTap={{ scale: 0.96 }}
          onClick={onConfirm}
          className="w-full py-5 rounded-2xl text-xl font-black flex items-center justify-center gap-3"
          style={{
            background: "#FF6B6B",
            color: "white",
            boxShadow: "0 5px 0 #c44e4e",
          }}
        >
          <Home className="w-6 h-6" strokeWidth={2.5} />
          Да, в главное меню
        </motion.button>

        <motion.button
          data-testid="button-exit-cancel"
          whileTap={{ scale: 0.96 }}
          onClick={onCancel}
          className="w-full py-5 rounded-2xl text-xl font-black flex items-center justify-center gap-3"
          style={{
            background: "#F0E6FF",
            color: "#3D1A6E",
          }}
        >
          <X className="w-6 h-6" strokeWidth={2.5} />
          Продолжить игру
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
