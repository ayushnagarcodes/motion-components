import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function ExitAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-stone-100">
      <button
        className="mx-auto rounded-full bg-black px-5 py-3 text-white"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        Toggle visibility
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mx-auto w-full max-w-[300px] rounded-2xl bg-white p-4 text-black"
          >
            <div className="mb-3 aspect-video w-full rounded-xl bg-gray-300" />
            Random card
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ExitAnimation;
