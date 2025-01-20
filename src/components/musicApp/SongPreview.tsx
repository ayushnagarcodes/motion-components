import { motion } from "motion/react";
import { SongType } from "./songs";

interface SongPreviewProps {
  song: SongType;
  setSelectedSong: (song: SongType) => void;
}

export function SongPreview({ song, setSelectedSong }: SongPreviewProps) {
  return (
    <motion.div
      layoutId={`song-bg-${song.id}`}
      style={{ borderRadius: 12 }}
      className="grid cursor-pointer grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-3 overflow-clip bg-gray-200 p-4 text-black"
      onClick={() => setSelectedSong(song)}
    >
      <motion.img
        layoutId={`song-img-${song.id}`}
        src={song.cover}
        alt={song.title}
        style={{ borderRadius: 12 }}
        className="row-span-2 h-14 w-14"
      />

      <motion.div
        layoutId={`song-title-${song.id}`}
        className="text-lg font-bold leading-snug"
      >
        <motion.span layout className="inline-block">
          {song.title}
        </motion.span>
      </motion.div>

      <motion.div
        layoutId={`song-artist-${song.id}`}
        className="text-sm leading-snug"
      >
        <motion.span layout className="inline-block">
          {song.artist}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
