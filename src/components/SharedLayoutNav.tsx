import { useState } from "react";
import { motion } from "motion/react";

function SharedLayoutNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="grid min-h-screen place-items-center bg-fuchsia-200">
      <ul className="flex gap-2 text-fuchsia-950 *:px-5 *:py-2">
        <li
          className="relative cursor-pointer"
          onClick={() => setActiveIndex(0)}
        >
          <a className="relative z-10">Home</a>
          {activeIndex === 0 && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-fuchsia-400"
              layoutId="active-indicator"
            />
          )}
        </li>
        <li
          className="relative cursor-pointer"
          onClick={() => setActiveIndex(1)}
        >
          <a className="relative z-10">About</a>
          {activeIndex === 1 && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-fuchsia-400"
              layoutId="active-indicator"
            />
          )}
        </li>
        <li
          className="relative cursor-pointer"
          onClick={() => setActiveIndex(2)}
        >
          <a className="relative z-10">Contact</a>
          {activeIndex === 2 && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-fuchsia-400"
              layoutId="active-indicator"
            />
          )}
        </li>
      </ul>
    </section>
  );
}

export default SharedLayoutNav;
