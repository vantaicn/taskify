import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BurstCheckbox = () => {
  const [checked, setChecked] = useState(false);
  const [burstKey, setBurstKey] = useState(0); // để reset animation

  const handleToggle = () => {
    setChecked(!checked);
    if (!checked) {
      setBurstKey(burstKey + 1); // trigger lại burst
    }
  };

  const rays = Array.from({ length: 8 }); // số tia sáng

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className={`w-8 h-8 rounded-md border-2 flex items-center justify-center transition-colors 
        ${checked ? "bg-green-500 border-green-600" : "border-gray-400"}`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Hiệu ứng burst */}
      <AnimatePresence>
        {checked && (
          <div className="relative">
            {rays.map((_, i) => {
              const angle = (i * 360) / rays.length;
              return (
                <motion.span
                  key={`${burstKey}-${i}`}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                  animate={{
                    opacity: 0,
                    x: 40 * Math.cos((angle * Math.PI) / 180),
                    y: 40 * Math.sin((angle * Math.PI) / 180),
                    scale: 1,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute left-0 top-0 w-2 h-2 rounded-full bg-green-400"
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BurstCheckbox;
