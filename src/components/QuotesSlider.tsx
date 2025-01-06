import { motion } from "motion/react";
import { useState } from "react";
import useInterval from "../hooks/useInterval";
import { quotes } from "../utils/quotes";
import { ChevronLeft, ChevronRight } from "../utils/icons";

const SPEED = 4000; // in 'ms'

const getQuoteVariant = (index: number, suffix?: string) =>
  `quote_${index}` + (suffix ? `_${suffix}` : "");

function QuotesSlider() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const lastQuoteIndex = quotes.length - 1;
  const [isPaused, setIsPaused] = useState(false);

  const next = () => {
    setActiveQuoteIndex((currentQuote) =>
      currentQuote >= lastQuoteIndex ? 0 : currentQuote + 1
    );
  };

  const previous = () => {
    setActiveQuoteIndex((currentQuote) =>
      currentQuote === 0 ? lastQuoteIndex : currentQuote - 1
    );
  };

  useInterval(
    () => window.requestAnimationFrame(next),
    isPaused ? null : SPEED
  );

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-slate-200">
      <motion.div
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
        className="relative w-[400px] max-w-[85%] rounded-2xl bg-white px-12 py-5"
        initial="inactive"
        animate={`quote_${activeQuoteIndex}`}
        whileHover={[
          "paused",
          getQuoteVariant(activeQuoteIndex, "highlighted"),
        ]}
      >
        <div className="flex justify-center">
          {quotes.map((quote, index) => (
            <motion.img
              key={index}
              variants={{
                [getQuoteVariant(index)]: {
                  scale: 1.2,
                  zIndex: 10,
                },
                paused: {
                  scale: 0.9,
                  filter: "grayscale(1)",
                },
                [getQuoteVariant(index, "highlighted")]: {
                  scale: 1.2,
                  zIndex: 10,
                  filter: "grayscale(0)",
                },
              }}
              className="relative -mx-2 h-12 w-12 rounded-full border border-black"
              src={quote.image}
            />
          ))}
        </div>

        <div className="mt-3 grid text-center">
          {quotes.map((quote, index) => (
            <motion.blockquote
              key={index}
              variants={{
                inactive: { opacity: 0, y: 20 },
                [getQuoteVariant(index)]: { opacity: 1, y: 0 },
              }}
              className="relative [grid-area:1/1]"
            >
              <p>{quote.text}</p>
              <p className="mt-3 text-sm font-bold">
                {quote.name} - {quote.roleCompany}
              </p>
            </motion.blockquote>
          ))}
        </div>

        <motion.button
          onClick={previous}
          variants={{
            inactive: { x: -20, opacity: 0 },
            paused: { x: 0, opacity: 1 },
          }}
          className="absolute left-0 top-1/2 block px-3"
        >
          <ChevronLeft /> <span className="sr-only">Previous</span>
        </motion.button>

        <motion.button
          onClick={next}
          variants={{
            inactive: { x: 20, opacity: 0 },
            paused: { x: 0, opacity: 1 },
          }}
          className="absolute right-0 top-1/2 block px-3"
        >
          <ChevronRight /> <span className="sr-only">Next</span>
        </motion.button>
      </motion.div>
    </section>
  );
}

export default QuotesSlider;
