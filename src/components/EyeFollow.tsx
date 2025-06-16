import { motion } from "motion/react";
import { useState } from "react";

function EyeFollow() {
  const [angle, setAngle] = useState(0);

  const handleMouseMove = (event: React.MouseEvent) => {
    const anchor = event.currentTarget;
    const rect = anchor.getBoundingClientRect();
    const anchorX = rect.left + rect.width / 2;
    const anchorY = rect.top + rect.height / 2;

    const radian = Math.atan2(anchorY - event.clientY, anchorX - event.clientX);
    const degree = (radian * 180) / Math.PI;
    setAngle(degree);
  };

  return (
    <section
      className="relative flex h-screen items-center justify-center gap-4 p-2 *:shrink-0"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ rotate: angle - 90 }}
        className="relative h-20 w-20 rounded-full bg-red-400"
      >
        <div className="absolute top-2 left-3 h-10 w-10 rounded-full bg-white"></div>
      </motion.div>
      <motion.div
        style={{ rotate: angle - 90 }}
        className="relative h-20 w-20 rounded-full bg-gray-500"
      >
        <div className="absolute top-2 left-3 h-10 w-10 rounded-full bg-white"></div>
      </motion.div>
    </section>
  );
}

export default EyeFollow;
