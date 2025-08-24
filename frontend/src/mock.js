export const brand = {
  name: "Piranha",
  tagline: "Cocktail Bureau",
  message: "Dobrodošli v",
  primaryHex: "#f4ce90",
  accentHex: "#0B788A",
};

import { getImageUrl } from './utils/images';

export const galleryImages = [
  // Your actual cocktail images with proper names and categories
  // Add blobUrl property when images are uploaded to Vercel Blob
  {
    id: "minty-cocktail",
    localPath: "cocktails/minty-cocktail.jpg",
    blobUrl: null, // Will be populated after upload to Vercel Blob
    alt: "Minty cocktail with fresh herbs",
  },
  {
    id: "highball-collins",
    localPath: "cocktails/highball-collins.jpg",
    blobUrl: null,
    alt: "Highball Collins cocktail",
  },
  {
    id: "tropical-sour",
    localPath: "cocktails/tropical-sour.jpg",
    blobUrl: null,
    alt: "Tropical sour cocktail",
  },
  {
    id: "spirit-forward-cocktail",
    localPath: "cocktails/spirit-forward-cocktail.jpg",
    blobUrl: null,
    alt: "Spirit-forward cocktail",
  },
  {
    id: "martini-cosmo",
    localPath: "cocktails/martini-cosmo.jpg",
    blobUrl: null,
    alt: "Martini or Cosmopolitan style cocktail",
  },
  {
    id: "old-fashioned",
    localPath: "cocktails/old-fashioned.jpg",
    blobUrl: null,
    alt: "Classic Old Fashioned cocktail",
  },
  {
    id: "whiskey-sour",
    localPath: "cocktails/whiskey-sour.jpg",
    blobUrl: null,
    alt: "Whiskey Sour cocktail",
  },
  {
    id: "neat-pour-rocks",
    localPath: "cocktails/neat-pour-rocks.jpg",
    blobUrl: null,
    alt: "Neat pour or on the rocks cocktail",
  },
  {
    id: "process-shot-1",
    localPath: "gallery/process/IMG_7655.JPG",
    blobUrl: null,
    alt: "Cocktail making process",
  },
  {
    id: "process-shot-2",
    localPath: "gallery/process/IMG_7656.JPG",
    blobUrl: null,
    alt: "Behind the scenes cocktail preparation",
  },
  {
    id: "process-shot-3",
    localPath: "gallery/process/IMG_7660.JPG",
    blobUrl: null,
    alt: "Professional cocktail crafting",
  },
  {
    id: "process-shot-4",
    localPath: "gallery/process/IMG_7810.JPG",
    blobUrl: null,
    alt: "Cocktail preparation technique",
  },
  {
    id: "process-shot-5",
    localPath: "gallery/process/IMG_7833.JPG",
    blobUrl: null,
    alt: "Final cocktail preparation step",
  },
];

export const signatureCocktails = [
  {
    id: "sig-01",
    name: "Piranha Old Fashioned",
    price: 16,
    tags: ["bourbon", "demerara", "house bitters"],
    imageId: "old-fashioned", // References your actual image
    blurb: "Naša interpretacija klasike – kremast dim, rahla sladkoba in zlata eleganca.",
  },
  {
    id: "sig-02",
    name: "Tropical Paradise Sour",
    price: 14,
    tags: ["rum", "passion fruit", "lime", "foam"],
    imageId: "tropical-sour", // References your actual image
    blurb: "Eksotična svežina z bogato peno – popoln pobeg v tropski raj.",
  },
  {
    id: "sig-03",
    name: "Emerald Highball",
    price: 12,
    tags: ["gin", "elderflower", "cucumber", "tonic"],
    imageId: "highball-collins", // References your actual image
    blurb: "Kristalno čist, izjemno osvežujoč – popoln za dolge poletne večere.",
  },
  {
    id: "sig-04",
    name: "Midnight Martini",
    price: 15,
    tags: ["vodka", "dry vermouth", "olive brine"],
    imageId: "martini-cosmo", // References your actual image
    blurb: "Elegantna klasika z našim pridihom – čist, oster in nepozaben.",
  },
  {
    id: "sig-05",
    name: "Garden Fresh Mojito",
    price: 13,
    tags: ["white rum", "fresh mint", "lime", "soda"],
    imageId: "minty-cocktail", // References your actual image
    blurb: "Sveža meta iz našega vrta, kubanski rum in popolna ravnovesje.",
  },
  {
    id: "sig-06",
    name: "Smoky Whiskey Sour",
    price: 14,
    tags: ["bourbon", "lemon", "egg white", "smoke"],
    imageId: "whiskey-sour", // References your actual image
    blurb: "Dimna eleganca s svilnato peno – tradicionalna tehnika z moderno noto.",
  },
];

export const hours = [
  { day: "Ponedeljek", time: "09:00 – 00:00", open: "09:00", close: "00:00" },
  { day: "Torek", time: "09:00 – 00:00", open: "09:00", close: "00:00" },
  { day: "Sreda", time: "09:00 – 00:00", open: "09:00", close: "00:00" },
  { day: "Četrtek", time: "09:00 – 00:00", open: "09:00", close: "00:00" },
  { day: "Petek", time: "09:00 – 02:00", open: "09:00", close: "02:00" },
  { day: "Sobota", time: "09:00 – 02:00", open: "09:00", close: "02:00" },
  { day: "Nedelja", time: "09:00 – 00:00", open: "09:00", close: "00:00" },
];

// Helper function to check if currently open and get status
export const getOpenStatus = () => {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

  // Map JavaScript day numbers to our hours array indices
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Sunday=6, Monday=0, etc.
  const todayIndex = dayMap[currentDay];
  const todayHours = hours[todayIndex];

  // Parse opening and closing times
  const [openHour, openMin] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.close.split(':').map(Number);

  const openTime = openHour * 60 + openMin;
  let closeTime = closeHour * 60 + closeMin;

  // Handle closing times after midnight (like 02:00)
  if (closeTime < openTime) {
    closeTime += 24 * 60; // Add 24 hours
  }

  let adjustedCurrentTime = currentTime;
  // If current time is early morning and we close after midnight, adjust current time
  if (currentTime < 12 * 60 && closeTime > 24 * 60) {
    adjustedCurrentTime += 24 * 60;
  }

  const isOpen = adjustedCurrentTime >= openTime && adjustedCurrentTime < closeTime;

  if (isOpen) {
    // Calculate time until closing
    const minutesUntilClose = closeTime - adjustedCurrentTime;
    const hoursUntilClose = Math.floor(minutesUntilClose / 60);
    const minsUntilClose = minutesUntilClose % 60;

    let timeUntilClose;
    if (hoursUntilClose > 0) {
      timeUntilClose = `${hoursUntilClose}h ${minsUntilClose}min`;
    } else {
      timeUntilClose = `${minsUntilClose}min`;
    }

    return {
      isOpen: true,
      status: "Odprto",
      timeInfo: `Zapremo čez ${timeUntilClose}`,
      nextChange: `Zapremo ob ${todayHours.close}`
    };
  } else {
    // Find next opening time
    let nextOpenDay = todayIndex;
    let nextOpenTime = openTime;

    // If we haven't opened today yet
    if (currentTime < openTime) {
      nextOpenTime = openTime;
    } else {
      // Look for next day we're open
      nextOpenDay = (todayIndex + 1) % 7;
      nextOpenTime = hours[nextOpenDay].open.split(':').map(Number);
      nextOpenTime = nextOpenTime[0] * 60 + nextOpenTime[1];
    }

    const nextDayName = hours[nextOpenDay].day;
    const nextOpenTimeStr = hours[nextOpenDay].open;

    return {
      isOpen: false,
      status: "Zaprto",
      timeInfo: `Odpremo ${nextOpenDay === todayIndex ? 'danes' : nextDayName.toLowerCase()} ob ${nextOpenTimeStr}`,
      nextChange: `Odpremo ob ${nextOpenTimeStr}`
    };
  }
};

export const address = {
  line1: "Vojašniška ulica 4",
  city: "2000 Maribor",
  phone: "123 456 789",
  email: "mail@domain.com",
  instagram: "@piranhacocktailbureau",
  map: "https://maps.google.com/?q=Vojašniška+ulica+4,+2000+Maribor",
};

export const aboutQuotes = {
  profesionalizem:
    "Verjeli ali ne, imamo veliko skupnega: stremljenje k najvišjim ciljem, željo po ultimativnem užitku in profesionalni pristop.\n\nV Piranhi je vsak koktajl, ki ga boste okusili, fuzija najboljših sestavin in profesionalnosti našega kolektiva. Ker cenimo izvirnost, predanost in ekipni duh, cenimo življenje.",
  hedonizem:
    "Vabljeni k okušanju zbirke koktajlov, ki vas bodo popeljali na uživaško potovanje skozi desetletno zgodovino, z vznemirljivim ciljem … nekje v prihodnosti. Vkrcajte se!",
};

// Helper to resolve image by id - prioritizes Vercel Blob URLs, falls back to local
export const imageById = (id) => {
  const image = galleryImages.find((g) => g.id === id);
  if (!image) return null;

  // Prioritize Vercel Blob URL if available, otherwise use local path
  const imagePath = image.blobUrl || image.localPath;
  return getImageUrl(imagePath);
};