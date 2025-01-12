import { motion } from "motion/react";

function StaggeredScroll() {
  return (
    <section className="relative h-screen overflow-auto bg-stone-900 px-16">
      <p className="sticky top-[40%] w-full text-center italic text-white">
        Scroll The Container!
      </p>

      <div className="relative z-10 flex min-h-[200vh] w-full flex-col items-center justify-center gap-6">
        <motion.div
          className="grid w-full grid-cols-4 gap-4 rounded-xl text-center"
          variants={{
            hidden: {
              transition: {
                staggerChildren: 0.1,
                staggerDirection: -1,
              },
            },
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="hidden"
          whileInView="visible"
          viewport={{ amount: 1 }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex h-48 items-center justify-center rounded-lg bg-stone-400 text-xl text-stone-800"
            ></motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default StaggeredScroll;
