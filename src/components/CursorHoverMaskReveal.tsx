import { motion } from "motion/react";
import { useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";

function CursorHoverMaskReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsContainerHovered(true)}
      onMouseLeave={() => setIsContainerHovered(false)}
      className="relative min-h-screen w-full bg-[#0f0f0f]"
    >
      <MaskedContent
        containerRef={containerRef}
        isContainerHovered={isContainerHovered}
      />
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

type MaskedContentProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isContainerHovered: boolean;
};

function MaskedContent({
  containerRef,
  isContainerHovered,
}: MaskedContentProps) {
  const [isTextHovered, setIsTextHovered] = useState(false);
  const { x, y } = useMousePosition(containerRef);
  const size = isTextHovered ? 400 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, maskSize: "0px", maskPosition: "0 0" }}
      animate={
        isContainerHovered
          ? {
              opacity: 1,
              maskSize: `${size}px`,
              maskPosition: `${x - size / 2}px ${y - size / 2}px`,
            }
          : undefined
      }
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      className="absolute grid h-full place-items-center bg-[#ec4e39] mask-[url(/assets/masks/circle.svg)] mask-no-repeat p-8"
    >
      <p
        className="text-5xl font-semibold text-[#0f0f0f]"
        onMouseEnter={() => setIsTextHovered(true)}
        onMouseLeave={() => setIsTextHovered(false)}
      >
        A visual designer - with skills that haven't been replaced by A.I (yet)
        - making good shit only if the paycheck is equally good.
      </p>
    </motion.div>
  );
}

export default CursorHoverMaskReveal;
