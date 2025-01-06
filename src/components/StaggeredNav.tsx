import { motion } from "framer-motion";
import { useState } from "react";
import { HamburgerIcon } from "../utils/icons";

const menuItems = ["Home", "Invoices", "Usage", "Profile", "Settings"];

function StaggeredNav() {
  const [navigationIsVisible, setNavigationIsVisible] = useState(false);

  return (
    <section className="relative flex min-h-screen w-full items-center gap-6 bg-stone-200">
      <motion.div
        initial="hidden"
        animate={navigationIsVisible ? "visible" : "hidden"}
        variants={{
          hidden: {
            width: 74,
            transition: {
              staggerChildren: 0.1,
              staggerDirection: -1,
              // when: "afterChildren", // seems too late
              delay: (menuItems.length - 2) * 0.1,
            },
          },
          visible: {
            width: 200,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="h-screen bg-[rgba(10,10,10,.8)] p-3 text-white"
      >
        <button
          className="mb-4 rounded-md border border-black bg-white/5 p-3"
          onClick={() => setNavigationIsVisible((visible) => !visible)}
        >
          <span className="sr-only">Toggle navigation</span>
          <HamburgerIcon />
        </button>

        <nav>
          <ul>
            {menuItems.map((item) => (
              <motion.li
                key={item}
                className="rounded-md px-3 py-3 transition-colors hover:bg-white/5"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>

      <div className="grid flex-1 place-items-center">
        <p className="mr-8 rounded-md bg-stone-50 px-6 py-3 text-center text-xl">
          Staggered Nav
        </p>
      </div>
    </section>
  );
}

export default StaggeredNav;
