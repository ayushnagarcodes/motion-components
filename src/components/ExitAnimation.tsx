import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function ExitAnimation() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-8 bg-stone-800 pt-[30%]">
      <button
        className="rounded-full bg-white px-4 py-2 font-medium"
        onClick={() => setOpenModal((open) => !open)}
      >
        Toggle Dialog
      </button>

      <AnimatePresence>
        {openModal && (
          <motion.div
            variants={{
              open: {
                opacity: 1,
                y: 0,
              },
              closed: {
                opacity: 0,
                y: 20,
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            className="pointer-events-none inset-0 flex items-end justify-center"
          >
            <div className="pointer-events-auto w-[300px] max-w-full overflow-hidden rounded-2xl bg-white p-2 pb-4 text-black">
              <div className="flex justify-end">
                <motion.button
                  variants={{
                    open: {
                      scale: 1,
                    },
                    closed: {
                      scale: 0,
                    },
                  }}
                  onClick={() => setOpenModal(false)}
                  aria-label="Close"
                  className="block h-8 w-8 rounded-full bg-black p-2"
                >
                  <svg viewBox="0 0 512 512" className="fill-white">
                    <path d="M443.6 387.1 312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z" />
                  </svg>
                </motion.button>
              </div>

              <div className="mt-2">
                <motion.img
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                    },
                    closed: {
                      opacity: 0,
                      y: 20,
                    },
                  }}
                  className="rounded-xl"
                  src="/assets/images/code-1.jpg"
                />
              </div>

              <motion.p
                variants={{
                  open: {
                    opacity: 1,
                    y: 0,
                  },
                  closed: {
                    opacity: 0,
                    y: 40,
                  },
                }}
                className="mt-2 px-4 text-2xl font-bold"
              >
                Bambi
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ExitAnimation;
