import type { SeriesId } from "./series";

export type WorkContentKey =
  | "nounai28"
  | "ura28"
  | "geminiEscape"
  | "geminiThaw"
  | "herocon"
  | "noteMae";

export type WorkFormatKey = "essay" | "music" | "experiment";

export interface WorkItem {
  id: string;
  index: string;
  image: string;
  slug: string;
  link: string;
  gallery: string[];
  contentKey: WorkContentKey;
  formatKey: WorkFormatKey;
  seriesId: SeriesId;
}

export const works: WorkItem[] = [
  {
    id: "01",
    index: "[ 01 ]",
    image:
      "https://readdy.ai/api/search-image?query=A%20small%20ceramic%20bowl%20of%20clear%20water%20beside%20a%20softly%20lit%20candle%20and%20a%20folded%20note%20on%20a%20warm%20oat%20cream%20wooden%20table%2C%20quiet%20everyday%20ritual%20still%20life%2C%20faint%20reflected%20light%2C%20calm%20editorial%20photography%2C%20terracotta%20and%20beige%20tones%2C%20soft%20natural%20daylight%2C%20no%20people%2C%20no%20readable%20text&width=800&height=1000&seq=heron-waterfes-a-v2&orientation=portrait",
    slug: "nounai-28",
    link: "https://note.com/nifty_sheep7386/n/n091809f0af61",
    contentKey: "nounai28",
    formatKey: "essay",
    seriesId: "nounai",
    gallery: [
      "https://readdy.ai/api/search-image?query=Open%20handwritten%20notebook%20pages%20with%20small%20doodles%20of%20rippling%20water%20and%20a%20tiny%20bowl%20resting%20on%20a%20warm%20cream%20blanket%2C%20cozy%20still%20life%2C%20soft%20daylight%2C%20no%20people%2C%20no%20readable%20text&width=720&height=480&seq=heron-waterfes-b-v2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=A%20single%20pencil%20and%20a%20glass%20of%20water%20on%20a%20warm%20sand%20colored%20surface%20with%20folded%20paper%20nearby%2C%20calm%20editorial%20photography%2C%20soft%20side%20light%2C%20no%20people%2C%20no%20readable%20text&width=640&height=800&seq=heron-waterfes-c-v2&orientation=portrait",
    ],
  },
  {
    id: "02",
    index: "[ 02 ]",
    image:
      "https://readdy.ai/api/search-image?query=Warm%20minimal%20scene%20of%20over%20ear%20headphones%20resting%20on%20a%20handwritten%20lyric%20notebook%20beside%20a%20ceramic%20mug%20on%20a%20cream%20wooden%20desk%2C%20faint%20glowing%20music%20waveform%20in%20the%20background%2C%20calm%20editorial%20still%20life%20photography%2C%20oat%20beige%20and%20terracotta%20tones%2C%20soft%20daylight%2C%20no%20people%2C%20no%20readable%20text&width=800&height=1000&seq=heron-miclu-a-v2&orientation=portrait",
    slug: "ura-28",
    link: "https://note.com/nifty_sheep7386/n/na8617bc8a388",
    contentKey: "ura28",
    formatKey: "music",
    seriesId: "ura",
    gallery: [
      "https://readdy.ai/api/search-image?query=Close%20up%20of%20a%20soft%20glowing%20music%20waveform%20reflected%20on%20warm%20cream%20paper%20with%20over%20ear%20headphones%20nearby%2C%20calm%20editorial%20still%20life%2C%20soft%20daylight%2C%20no%20people%2C%20no%20readable%20text&width=720&height=480&seq=heron-miclu-b-v2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Handwritten%20lyric%20notebook%20beside%20headphones%20and%20a%20mug%20on%20cream%20linen%2C%20warm%20quiet%20mood%2C%20editorial%20photography%2C%20soft%20side%20light%2C%20no%20people%2C%20no%20readable%20text&width=640&height=800&seq=heron-miclu-c-v2&orientation=portrait",
    ],
  },
  {
    id: "03",
    index: "[ 03 ]",
    image:
      "https://readdy.ai/api/search-image?query=Playful%20minimal%20desk%20with%20a%20laptop%20showing%20an%20abstract%20physics%20diagram%20of%20a%20house%20and%20a%20dotted%20escape%20trajectory%2C%20scattered%20sticky%20notes%20with%20sketched%20arrows%2C%20warm%20cream%20palette%2C%20calm%20editorial%20still%20life%20photography%2C%20soft%20daylight%2C%20no%20people%2C%20no%20readable%20text&width=800&height=1000&seq=heron-escape-a-v2&orientation=portrait",
    slug: "gemini-escape",
    link: "https://note.com/nifty_sheep7386/n/n89b4fa3b9953",
    contentKey: "geminiEscape",
    formatKey: "experiment",
    seriesId: "gemini",
    gallery: [
      "https://readdy.ai/api/search-image?query=Colorful%20sticky%20notes%20and%20a%20laptop%20on%20a%20warm%20cream%20desk%20arranged%20like%20a%20playful%20physics%20experiment%2C%20abstract%20sketched%20arrows%20and%20dotted%20lines%2C%20editorial%20still%20life%2C%20soft%20daylight%2C%20no%20people%2C%20no%20readable%20text&width=720&height=480&seq=heron-escape-b-v2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Overhead%20view%20of%20a%20minimal%20desk%20with%20a%20notebook%20of%20hand%20drawn%20equations%2C%20a%20mug%20and%20small%20doodled%20icons%20on%20cream%20paper%2C%20warm%20editorial%20photography%2C%20no%20people%2C%20no%20readable%20text&width=640&height=800&seq=heron-escape-c-v2&orientation=portrait",
    ],
  },
  {
    id: "04",
    index: "[ 04 ]",
    image:
      "https://readdy.ai/api/search-image?query=Minimal%20kitchen%20counter%20with%20neatly%20arranged%20frozen%20food%20packages%20in%20a%20shallow%20tray%20and%20a%20small%20smartphone%20showing%20an%20abstract%20minimal%20app%20screen%2C%20cold%20faint%20mist%2C%20warm%20cream%20kitchen%20light%2C%20calm%20editorial%20still%20life%20photography%2C%20oat%20beige%20tones%2C%20no%20people%2C%20no%20readable%20text&width=800&height=1000&seq=heron-thaw-a-v2&orientation=portrait",
    slug: "gemini-thaw",
    link: "https://note.com/nifty_sheep7386/n/ne8b16aa7c85d",
    contentKey: "geminiThaw",
    formatKey: "experiment",
    seriesId: "gemini",
    gallery: [
      "https://readdy.ai/api/search-image?query=Smartphone%20on%20a%20clean%20cream%20kitchen%20counter%20showing%20an%20abstract%20minimal%20app%20interface%20over%20a%20tray%20of%20frozen%20ingredients%2C%20soft%20daylight%2C%20calm%20editorial%20still%20life%2C%20no%20people%2C%20no%20readable%20text&width=720&height=480&seq=heron-thaw-b-v2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Top%20down%20view%20of%20frozen%20food%20packages%20wrapped%20in%20paper%20on%20a%20warm%20oat%20surface%20with%20a%20small%20timer%2C%20quiet%20kitchen%20mood%2C%20calm%20editorial%20photography%2C%20no%20people%2C%20no%20readable%20text&width=640&height=800&seq=heron-thaw-c-v2&orientation=portrait",
    ],
  },
  {
    id: "05",
    index: "[ 05 ]",
    image:
      "https://readdy.ai/api/search-image?query=Retro%20CRT%20television%20on%20a%20low%20wooden%20shelf%20beside%20a%20classic%20game%20controller%2C%20a%20cartridge%20resting%20nearby%2C%20warm%20cream%20room%2C%20faint%20pixel%20glow%20on%20the%20screen%2C%20calm%20Nordic%20editorial%20still%20life%20photography%2C%20oat%20beige%20tones%2C%20soft%20window%20light%2C%20no%20people%2C%20no%20readable%20text&width=800&height=1000&seq=heron-herocon-a-v2&orientation=portrait",
    slug: "herocon",
    link: "https://herocon-xi.vercel.app/",
    contentKey: "herocon",
    formatKey: "experiment",
    seriesId: "herocon",
    gallery: [
      "https://readdy.ai/api/search-image?query=Macro%20close%20up%20of%20a%20classic%20game%20controller%20and%20a%20cartridge%20on%20a%20warm%20cream%20surface%20with%20a%20soft%20pixel%20like%20glow%2C%20retro%20calm%20editorial%20still%20life%2C%20no%20people%2C%20no%20readable%20text&width=720&height=480&seq=heron-herocon-b-v2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Retro%20CRT%20screen%20with%20a%20faint%20pixel%20pattern%20glow%20in%20a%20warm%20dim%20cream%20room%2C%20nostalgic%20calm%20editorial%20photography%2C%20no%20people%2C%20no%20readable%20text&width=640&height=800&seq=heron-herocon-c-v2&orientation=portrait",
    ],
  },
  {
    id: "06",
    index: "[ 06 ]",
    image:
      "https://readdy.ai/api/search-image?query=Minimal%20desk%20with%20a%20smartphone%20showing%20an%20abstract%20minimal%20app%20interface%2C%20a%20small%20notebook%20and%20a%20cup%20of%20tea%20near%20a%20bright%20window%2C%20calm%20working%20from%20room%20mood%2C%20warm%20oat%20cream%20palette%2C%20editorial%20still%20life%20photography%2C%20soft%20daylight%2C%20no%20people%2C%20no%20readable%20text&width=800&height=1000&seq=heron-notemae-a-v2&orientation=portrait",
    slug: "note-mae",
    link: "https://heron-note.github.io/note-no-maeni/",
    contentKey: "noteMae",
    formatKey: "experiment",
    seriesId: "noteMae",
    gallery: [
      "https://readdy.ai/api/search-image?query=Smartphone%20on%20a%20cream%20desk%20showing%20abstract%20minimal%20app%20cards%20with%20small%20tags%20and%20stamps%2C%20warm%20editorial%20still%20life%20with%20soft%20daylight%2C%20no%20people%2C%20no%20readable%20text&width=720&height=480&seq=heron-notemae-b-v2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Top%20down%20view%20of%20a%20smartphone%2C%20notebook%20and%20cup%20of%20tea%20on%20a%20warm%20oat%20desk%2C%20quiet%20focus%20mood%2C%20calm%20editorial%20photography%2C%20no%20people%2C%20no%20readable%20text&width=640&height=800&seq=heron-notemae-c-v2&orientation=portrait",
    ],
  },
];