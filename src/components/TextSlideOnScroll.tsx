import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function TextSlideOnScroll() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.7, 0.75],
    [0, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.1], [1.5, 1]);
  const xRow1 = useTransform(scrollYProgress, [0.15, 0.75], [0, -300]);
  const xRow2 = useTransform(scrollYProgress, [0.15, 0.75], [0, 300]);
  const xRow3 = useTransform(scrollYProgress, [0.15, 0.75], [0, -400]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-y-auto bg-stone-900"
    >
      <p className="sticky top-[45%] w-full text-center italic text-white">
        Scroll The Container!
      </p>
      <div className="h-screen" />
      <div className="h-[300vh] overflow-x-clip">
        <div className="sticky top-1/2 -translate-y-1/2 space-y-4 overflow-clip bg-stone-900 text-[68px] text-white">
          <motion.div
            style={{ x: xRow1, scale, opacity }}
            className="flex items-center justify-center gap-6"
          >
            <p>HTML</p>
            <Image id={1} />
            <p>CSS</p>
            <Image id={2} />
            <p>JavaScript</p>
            <Image id={3} />
            <p>TypeScript</p>
            <Image id={4} />
          </motion.div>

          <motion.div
            style={{ x: xRow2, scale, opacity }}
            className="flex items-center justify-center gap-6"
          >
            <p>Svelte</p>
            <Image id={5} />
            <p>Vue</p>
            <Image id={6} />
            <p>React</p>
            <Image id={7} />
            <p>Angular</p>
            <Image id={8} />
          </motion.div>

          <motion.div
            style={{ x: xRow3, scale, opacity }}
            className="flex items-center justify-center gap-6"
          >
            <p>Accessibility</p>
            <Image id={9} />
            <p>Performance</p>
            <Image id={10} />
            <p>SEO</p>
            <Image id={11} />
            <p>Semantics</p>
            <Image id={12} />
          </motion.div>
        </div>
      </div>
      <div className="h-screen" />
    </section>
  );
}

function Image({ id }: { id: number }) {
  return (
    <img
      className="h-16 w-16 shrink-0 rounded-full"
      src={`https://randomuser.me/api/portraits/women/${id}.jpg`}
      alt="Random user picture"
    />
  );
}

export default TextSlideOnScroll;
