import { motion } from "motion/react";

function TextStretch() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#120918]">
      <div className="flex h-[370px] w-[160px] flex-col justify-end overflow-hidden rounded-2xl border border-[rgba(255,255,255,.1)] bg-[#322b38] p-4">
        <div
          style={maskStyles}
          className="bg from relative -ml-2 h-full w-[calc(100%+3.2rem)] overflow-hidden"
        >
          <motion.p
            className="absolute inset-x-0 right-[30%] origin-top-left break-words font-mono text-[86px] !leading-[75px] text-[#826649]"
            animate={{
              opacity: [0, 1, 1, 1, 1, 1, 0],
              scaleX: [1.5, 1.5, 2.4, 2.4, 1.5, 1.5],
              scaleY: [0.75, 0.75, 0.75, 1.4, 1.4, 5],
            }}
            transition={{
              duration: 12,
              times: [0, 0.05, 0.2, 0.45, 0.7, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            responsive
          </motion.p>
        </div>

        <p className="text-[rgba(255,255,255,.87)]">
          Make your animations work on all devices.
        </p>
      </div>
    </section>
  );
}

const maskStyles = {
  maskImage:
    "linear-gradient(black 0%,black calc(100% - 80px),transparent 100%)",
};

export default TextStretch;
