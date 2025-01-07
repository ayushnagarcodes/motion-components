import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bell, Logo } from "../utils/icons";
import { fakeNotifications } from "../utils/utils";

function ResponsiveNotify() {
  const [showNotifications, setShowNotifications] = useState(true);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center gap-6 bg-slate-800">
      <div className="mx-auto mt-[25%] w-full max-w-[300px]">
        <button
          className="mb-4 rounded-2xl bg-black p-3 text-gray-200 transition-colors hover:bg-gray-900 focus-visible:bg-gray-900"
          onClick={() => setShowNotifications((show) => !show)}
          aria-label="Toggle notifications"
        >
          <Bell />
        </button>

        <AnimatePresence>
          {showNotifications && (
            <motion.div
              variants={{
                open: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
                closed: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="w-full max-w-[300px] rounded-2xl border border-gray-300 bg-white text-black shadow-xl"
            >
              <div className="text-md border-b border-gray-300 px-5 py-3 font-bold">
                <p>Notifications</p>
              </div>

              <ul className="m-0 divide-y divide-gray-300 overflow-hidden p-0">
                {fakeNotifications.map((notification) => (
                  <motion.li
                    variants={{
                      open: {
                        opacity: 1,
                        "--x": "0px",
                        "--y": "0px",
                      },
                      closed: {
                        opacity: 0,
                        "--x": "50px",
                        "--y": "50px",
                      },
                    }}
                    className="flex items-center gap-4 px-5 py-3 leading-tight max-sm:translate-y-[--y] md:translate-x-[--x]"
                    key={notification.id}
                  >
                    <Logo />

                    <div>
                      <p className="text-md mb-2">{notification.message}</p>
                      <p className="text-sm opacity-80">
                        {notification.timeAgo}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ResponsiveNotify;
