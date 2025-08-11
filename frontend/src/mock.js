export const brand = {
  name: "Piranha",
  tagline: "Cocktail Bureau",
  primaryHex: "#f4ce90",
  accentHex: "#0B788A",
};

export const galleryImages = [
  // Premium, moody cocktail images curated by vision agent - optimized URLs
  {
    id: "u-1621873495884",
    url: "https://images.unsplash.com/photo-1621873495884-845a939892d1?crop=entropy&cs=srgb&fm=webp&q=80&w=800",
    alt: "Smoky whiskey cocktail on dark background",
  },
  {
    id: "u-1655546836727",
    url: "https://images.unsplash.com/photo-1655546836727-bec4387b02e2?crop=entropy&cs=srgb&fm=webp&q=80&w=800",
    alt: "Garnished cocktail with orange peel",
  },
  {
    id: "u-1615887023516",
    url: "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?crop=entropy&cs=srgb&fm=webp&q=80&w=800",
    alt: "Elegant coupe glass with deep amber drink",
  },
  {
    id: "p-2575697",
    url: "https://images.pexels.com/photos/2575697/pexels-photo-2575697.jpeg?w=800&h=600&fit=crop&auto=compress&cs=tinysrgb",
    alt: "Neon-lit cocktail with mint on black",
  },
  {
    id: "p-2860686",
    url: "https://images.pexels.com/photos/2860686/pexels-photo-2860686.jpeg?w=800&h=600&fit=crop&auto=compress&cs=tinysrgb",
    alt: "Classic cocktail with ice on black table",
  },
  {
    id: "u-1597241693839",
    url: "https://images.unsplash.com/photo-1597241693839-07d7fb803af1?crop=entropy&cs=srgb&fm=webp&q=80&w=800",
    alt: "Pouring drink with dramatic splash",
  },
  {
    id: "u-1617721042693",
    url: "https://images.unsplash.com/photo-1617721042693-0812f6d26d44?crop=entropy&cs=srgb&fm=webp&q=80&w=800",
    alt: "Two moody cocktails with citrus garnish",
  },
  {
    id: "u-1611031961555",
    url: "https://images.unsplash.com/photo-1611031961555-9b9ad46f6b73?crop=entropy&cs=srgb&fm=webp&q=80&w=800",
    alt: "Minimal black cocktail with smoke",
  },
];

export const signatureCocktails = [
  {
    id: "sig-01",
    name: "Black Gold Old Fashioned",
    price: 14,
    tags: ["bourbon", "demerara", "bitters"],
    imageId: "u-1615887023516",
    blurb:
      "Naša interpretacija klasike – kremast dim, rahla sladkoba in zlata eleganca.",
  },
  {
    id: "sig-02",
    name: "Piranha Negroni",
    price: 13,
    tags: ["gin", "amaro", "citrus"],
    imageId: "u-1655546836727",
    blurb:
      "Krepak in uravnotežen, z nežnim morskim pridihom naših botanicals.",
  },
  {
    id: "sig-03",
    name: "Nocturne Sour",
    price: 12,
    tags: ["mezcal", "limona", "pena"],
    imageId: "p-2575697",
    blurb:
      "Dimna svežina s svilnato strukturo – ustvarjeno za pozne ure.",
  },
  {
    id: "sig-04",
    name: "Amber Boulevardier",
    price: 14,
    tags: ["rye", "vermouth", "amaro"],
    imageId: "u-1597241693839",
    blurb: "Topel, razkošen in iskreno piten.",
  },
  {
    id: "sig-05",
    name: "Emerald Highball",
    price: 11,
    tags: ["japonski whisky", "soda", "yuzu"],
    imageId: "u-1617721042693",
    blurb: "Kristalno čist, izjemno osvežujoč.",
  },
  {
    id: "sig-06",
    name: "Velvet Espresso",
    price: 12,
    tags: ["espresso", "liker", "vanilija"],
    imageId: "u-1611031961555",
    blurb: "Bogata krema, natančna sladkoba, dolga čokoladna nota.",
  },
];

export const hours = [
  { day: "Pon – Čet", time: "17:00 – 23:00" },
  { day: "Pet – Sob", time: "17:00 – 01:00" },
  { day: "Ned", time: "Zaprto" },
];

export const address = {
  line1: "Cesta Hedonistov 9",
  city: "Ljubljana",
  phone: "+386 40 123 456",
  email: "hello@piranha.bar",
  map: "https://maps.google.com/?q=Ljubljana",
};

export const aboutQuotes = {
  profesionalizem:
    "Verjeli ali ne, imamo veliko skupnega: stremljenje k najvišjim ciljem, željo po ultimativnem užitku in profesionalni pristop.\n\nV Piranhi je vsak koktajl, ki ga boste okusili, fuzija najboljših sestavin in profesionalnosti našega kolektiva. Ker cenimo izvirnost, predanost in ekipni duh, cenimo življenje.",
  hedonizem:
    "Vabljeni k okušanju zbirke koktajlov, ki vas bodo popeljali na uživaško potovanje skozi desetletno zgodovino, z vznemirljivim ciljem … nekje v prihodnosti. Vkrcajte se!",
};

// Helper to resolve image by id
export const imageById = (id) => galleryImages.find((g) => g.id === id)?.url;