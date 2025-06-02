import { useState } from "react";
import { AnimatePresence } from "motion/react";

import { DetailView } from "./DetailView";
import { SongPreview } from "./SongPreview";
import songs, { SongType } from "./songs";

function MusicApp() {
  const [selectedSong, setSelectedSong] = useState<SongType | null>(null);

  return (
    <section className="grid h-screen place-items-center bg-linear-to-b from-gray-900 to-gray-600 p-2">
      <div className="relative mx-auto aspect-9/16 w-full max-w-[400px] overflow-clip rounded-3xl border border-white/10 bg-white/10 p-4 text-white">
        <div className="mb-8 flex aspect-video flex-col items-start justify-center gap-6 rounded-2xl bg-white/10 p-10">
          <p className="text-3xl font-bold">Trending music</p>
          <a className="rounded-full bg-white/10 px-4 py-2 font-normal">
            Explore now ▸
          </a>
        </div>
        <p className="mb-3 text-xl font-bold">Your favorites</p>
        <div className="grid grid-cols-1 gap-4">
          {songs.map((song) => (
            <SongPreview
              key={song.id}
              song={song}
              setSelectedSong={setSelectedSong}
            />
          ))}
        </div>
        <AnimatePresence>
          {selectedSong && (
            <DetailView
              onClose={() => setSelectedSong(null)}
              song={selectedSong}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default MusicApp;
