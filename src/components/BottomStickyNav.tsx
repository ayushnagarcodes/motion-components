import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const portfolioLinks = [
  "Google",
  "Facebook",
  "Amazon",
  "Microsoft",
  "Apple",
  "Tesla",
];

function BottomStickyNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex min-h-screen w-full items-end justify-center bg-[#302935] pb-48">
      <AnimatePresence>
        <motion.div
          layout
          style={{ borderRadius: 16 }}
          className="flex flex-col overflow-clip bg-white/10 p-4 text-slate-300"
        >
          {isOpen && (
            <motion.div
              layout
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mb-8 grid w-[80vw] max-w-[600px] grid-cols-2 gap-4 *:rounded-xl *:bg-white/10 *:px-4 *:py-2 md:w-[40vw] xl:w-[30vw]"
            >
              {portfolioLinks.map((linkTitle) => (
                <motion.a
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  key={linkTitle}
                  href="#"
                  className="inline-block"
                >
                  {linkTitle}
                </motion.a>
              ))}
            </motion.div>
          )}
          <motion.ol
            layout
            className="mx-auto flex gap-4 *:rounded-xl *:p-2 *:transition-colors *:hover:bg-gray-300 *:hover:text-stone-800"
          >
            <li>
              <a>Home</a>
            </li>
            <li
              className={`cursor-pointer ${isOpen ? "bg-gray-300 text-stone-800" : ""}`}
            >
              <button
                className="flex cursor-pointer items-center gap-1"
                onClick={() => setIsOpen(!isOpen)}
              >
                Portfolio
              </button>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </motion.ol>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default BottomStickyNav;
