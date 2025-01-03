import { motion, useMotionValue, useTransform } from "motion/react";

function DragTransform() {
  const x = useMotionValue(0);
  const backgroundColor = useTransform(
    x,
    [-200, 0, 200],
    ["#ff289e", "#ef4444", "#8821fe"]
  );
  const scale = useTransform(x, [-200, 0, 200], [1, 1, 1.75]);
  const borderRadius = useTransform(x, [-200, 0, 200], [100, 0, 100]);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-red-200">
      <p className="text-xl italic">Drag Me</p>

      <motion.div
        className="h-28 w-28 bg-red-500"
        style={{ x, backgroundColor, scale, borderRadius }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      ></motion.div>
    </section>
  );
}

export default DragTransform;
