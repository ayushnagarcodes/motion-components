import { motion } from "motion/react";
import { useState } from "react";
import useMousePosition from "../hooks/useMousePosition";

function CursorHoverMaskReveal() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <section className="relative min-h-screen w-full bg-[#0f0f0f]">
      <motion.div
        animate={{
          maskSize: `${size}px`,
          maskPosition: `${x - size / 2}px ${y - size / 2}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        className="absolute grid h-full place-items-center bg-[#ec4e39] mask-[url(/assets/masks/circle.svg)] mask-no-repeat p-8"
      >
        <p
          className="text-5xl font-semibold text-[#afa18f]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          A visual designer - with skills that haven't been replaced by A.I
          (yet) - making good shit only if the paycheck is equally good.
        </p>
      </motion.div>

      <div className="grid h-full place-items-center p-8">
        <p className="text-5xl font-semibold text-[#afa18f]">
          I'm a <span className="text-[#ec4e39]">selectively skilled</span>{" "}
          product designer with strong focus on producing high quality &
          impactful digital experience.
        </p>
      </div>
    </section>
  );
}

export default CursorHoverMaskReveal;
