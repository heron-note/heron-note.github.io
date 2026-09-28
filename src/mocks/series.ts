export type SeriesId = "nounai" | "ura" | "gemini" | "noteMae" | "herocon";

export interface SeriesItem {
  id: SeriesId;
  index: string;
  icon: string;
  accent: "clay" | "sage" | "ink" | "charcoal" | "stone";
  isMain: boolean;
  link: string;
}

export const series: SeriesItem[] = [
  {
    id: "nounai",
    index: "[ 01 ]",
    icon: "ri-flight-takeoff-line",
    accent: "clay",
    isMain: true,
    link: "https://note.com/nifty_sheep7386/m/maa584642dc87",
  },
  {
    id: "ura",
    index: "[ 02 ]",
    icon: "ri-music-2-line",
    accent: "sage",
    isMain: false,
    link: "https://note.com/nifty_sheep7386/m/m5311679317d2",
  },
  {
    id: "gemini",
    index: "[ 03 ]",
    icon: "ri-restaurant-2-line",
    accent: "ink",
    isMain: false,
    link: "https://note.com/nifty_sheep7386/m/m0fa6a309ef04",
  },
  {
    id: "noteMae",
    index: "[ 04 ]",
    icon: "ri-leaf-line",
    accent: "charcoal",
    isMain: false,
    link: "https://heron-note.github.io/note-no-maeni/",
  },
  {
    id: "herocon",
    index: "[ 05 ]",
    icon: "ri-gamepad-line",
    accent: "stone",
    isMain: false,
    link: "https://herocon-xi.vercel.app/",
  },
];