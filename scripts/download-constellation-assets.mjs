import fs from "fs";
import path from "path";

const ASSETS = [
  {
    id: "demon-like-judge-of-fire",
    filename: "demon-like-judge-of-fire.jpg",
    url: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/1/1d/Uriel_webnovel.jpg/revision/latest?cb=20221201063115",
    artist: "Blackbox (Official Webnovel Illustrator)",
    source: "https://omniscient-readers-viewpoint.fandom.com/wiki/Uriel",
    type: "official_webnovel"
  },
  {
    id: "secretive-plotter",
    filename: "secretive-plotter.png",
    url: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/5/57/Ch.414_Illustration.png/revision/latest?cb=20241006233634",
    artist: "Blackbox (Official Webnovel Illustrator)",
    source: "https://omniscient-readers-viewpoint.fandom.com/wiki/Secretive_Plotter/Gallery",
    type: "official_webnovel"
  },
  {
    id: "abyssal-black-flame-dragon",
    filename: "abyssal-black-flame-dragon.png",
    url: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/d/df/Abfd_238.png/revision/latest?cb=20241208000104",
    artist: "Sleepy-C / REDICE Studio (Official Webtoon Chapter 238)",
    source: "https://omniscient-readers-viewpoint.fandom.com/wiki/Abyssal_Black_Flame_Dragon",
    type: "official_webtoon"
  },
  {
    id: "prisoner-of-the-golden-headband",
    filename: "prisoner-of-the-golden-headband.jpg",
    url: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/5/59/Great_Sage%2C_Heaven%27s_Equal_%28Webtoon_Chapter_166%29.jpg/revision/latest?cb=20230728075627",
    artist: "Sleepy-C / REDICE Studio (Official Webtoon Chapter 166)",
    source: "https://omniscient-readers-viewpoint.fandom.com/wiki/Sun_Wukong",
    type: "official_webtoon"
  },
  {
    id: "the-oldest-dream",
    filename: "the-oldest-dream.png",
    url: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/a/a3/The_Oldest_Dream_%28Volume_5_cover%29.png/revision/latest?cb=20200228044825",
    artist: "Blackbox (Official Webnovel Volume 5 Cover)",
    source: "https://omniscient-readers-viewpoint.fandom.com/wiki/The_Most_Ancient_Dream",
    type: "official_webnovel"
  },
  {
    id: "maritime-war-god",
    filename: "maritime-war-god.jpg",
    url: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/b/b5/Yi_Sunsin.jpg/revision/latest?cb=20221210120200",
    artist: "Official ORV Production Art",
    source: "https://omniscient-readers-viewpoint.fandom.com/wiki/Yi_Sun-sin",
    type: "official_art"
  },
  {
    id: "olympus-nebula",
    filename: "olympus-nebula.png",
    url: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/9/9e/Olympus_87.png/revision/latest?cb=20250410214717",
    artist: "Sleepy-C / REDICE Studio (Official Webtoon Chapter 87)",
    source: "https://omniscient-readers-viewpoint.fandom.com/wiki/Olympus",
    type: "official_webtoon"
  },
  {
    id: "hades-father-of-rich-night",
    filename: "hades-father-of-rich-night.jpg",
    url: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/a/a4/Hades_%28novel%29.jpg/revision/latest?cb=20230527132423",
    artist: "Blackbox (Official Webnovel Illustrator)",
    source: "https://omniscient-readers-viewpoint.fandom.com/wiki/Hades",
    type: "official_webnovel"
  },
  {
    id: "persephone-queen-of-darkest-spring",
    filename: "persephone-queen-of-darkest-spring.png",
    url: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/1/1a/Persephone_novel.png/revision/latest?cb=20250430185036",
    artist: "Blackbox (Official Webnovel Illustrator)",
    source: "https://omniscient-readers-viewpoint.fandom.com/wiki/Persephone",
    type: "official_webnovel"
  }
];

const targetDir = path.join(process.cwd(), "public", "images", "constellations");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log(`Starting constellation asset download to ${targetDir}...`);

for (const asset of ASSETS) {
  const filePath = path.join(targetDir, asset.filename);
  console.log(`Downloading ${asset.id} (${asset.filename})...`);
  try {
    const res = await fetch(asset.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://omniscient-readers-viewpoint.fandom.com/",
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      }
    });

    if (!res.ok) {
      console.error(`  FAILED: HTTP ${res.status} ${res.statusText}`);
      continue;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    console.log(`  SUCCESS: Saved ${asset.filename} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
  }
}

console.log("Download cycle completed.");
