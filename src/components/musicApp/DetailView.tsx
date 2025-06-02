import { motion } from "motion/react";
import { SongType } from "./songs";

interface DetailViewProps {
  song: SongType;
  onClose: () => void;
}

export function DetailView({ song, onClose }: DetailViewProps) {
  return (
    <motion.div
      layoutId={`song-bg-${song.id}`}
      style={{ borderRadius: 12 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-200 p-4 text-center text-black"
    >
      <motion.img
        layoutId={`song-img-${song.id}`}
        src={song.cover}
        alt={song.title}
        style={{ borderRadius: 12 }}
        className="mb-[18px] aspect-square w-[200px]"
      />

      <motion.div
        layoutId={`song-title-${song.id}`}
        className="text-lg font-bold"
      >
        <motion.span layout className="inline-block">
          {song.title}
        </motion.span>
      </motion.div>

      <motion.div
        layoutId={`song-artist-${song.id}`}
        className="text-sm text-gray-800"
      >
        <motion.span layout className="inline-block">
          {song.artist}
        </motion.span>
      </motion.div>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        layout
        className="mt-4 max-w-[80%] text-sm"
      >
        {song.description}
      </motion.p>

      <motion.button
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { ease: "easeInOut", delay: 0.3, duration: 0.5 },
          },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        layout
        onClick={onClose}
        className="mt-16 w-[40%] cursor-pointer rounded-full bg-black px-4 py-2 text-white"
      >
        Back
      </motion.button>
    </motion.div>
  );
}
