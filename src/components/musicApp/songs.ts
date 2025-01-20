export interface SongType {
  id: number;
  title: string;
  artist: string;
  cover: string;
  description: string;
}

const songs = [
  {
    id: 1,
    title: "Random Access Memories",
    artist: "Daft Punk",
    cover: "/assets/images/random-access-memories.png",
    description:
      "An album by Daft Punk released in 2013, featuring the hit single 'Get Lucky'.",
  },
  {
    id: 2,
    title: "Lover",
    artist: "Taylor Swift",
    cover: "/assets/images/lover.png",
    description:
      "Taylor Swift's seventh studio album, released in 2019, featuring the title track 'Lover'.",
  },
  {
    id: 3,
    title: "Back to Black",
    artist: "Amy Winehouse",
    cover: "/assets/images/back-to-black.png",
    description:
      "Amy Winehouse's second and final studio album, released in 2006, featuring the hit single 'Rehab'.",
  },
];

export default songs;
