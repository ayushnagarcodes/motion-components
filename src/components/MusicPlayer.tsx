import { useState } from "react";
import { motion } from "framer-motion";

function MusicPlayer() {
  const [isSmall, setIsSmall] = useState(true);

  return (
    <section className="grid min-h-screen grid-cols-1 grid-rows-1 place-items-center bg-pink-200">
      <motion.div
        layout
        style={{
          flexDirection: isSmall ? "row" : "column",
          padding: isSmall ? "8px" : "24px",
          borderRadius: "12px",
        }}
        className="relative flex items-center justify-center gap-2 bg-[#d6b6df] text-center leading-snug text-black"
      >
        <motion.div
          layout
          style={{ width: isSmall ? "35px" : "80px" }}
          className="mx-auto grid aspect-square place-items-center rounded-full border-2 border-white bg-black shadow-xl *:[grid-area:1/1]"
        >
          <img
            src="/assets/images/interstellar.jpg"
            className="h-[25%] w-[25%] animate-spin rounded-full object-cover"
          />
          <span className="z-10 block aspect-square w-[8%] rounded-full bg-black" />
        </motion.div>

        <motion.div layout style={{ fontSize: isSmall ? "12px" : "16px" }}>
          <p className="font-bold">Interstellar</p>
          <p>Hans Zimmer</p>
        </motion.div>
      </motion.div>

      <button
        onClick={() => setIsSmall((small) => !small)}
        className="text-md mb-8 flex items-center justify-center gap-2 self-end rounded-lg bg-white px-5 py-2"
      >
        Toggle layout ({isSmall ? <>small</> : <>large</>})
      </button>
    </section>
  );
}

export default MusicPlayer;
