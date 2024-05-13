/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/
export interface Product {
  slug: string;
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    slug: "popeye-pellets",
    id: "1",
    image: "https://i.ibb.co/5906xNh/can3.png",
    title: "Popeye's Power Pellets",
    description:
      "Popeye's Power Pellets: Bottled vitality, hidden within an enigmatic vessel adorned with the visage of a legendary mariner. This elixir harnesses the vigor of spinach, empowering those who partake with an arcane strength reminiscent of ancient tales.",
    price: 239,
  },
  {
    slug: "node-noir",
    id: "2",
    image: "https://i.ibb.co/kc2Q3Sq/can6.png",
    title: "Node Noir",
    description:
      "Node Noir: A clandestine blend, veiled in the depths of binary twilight. Within its obsidian depths lie the whispers of server-side secrets, unraveling the enigma of digital shadows. With every sip, it guides through the labyrinth of code, revealing the arcane mysteries lurking within the night of nodes.",
    price: 49,
  },
  {
    slug: "cd-rum",
    id: "3",
    image: "https://i.ibb.co/TwBzYnn/can7.png",
    title: "CD - RUM",
    description:
      "CD-RUM: A wild fusion of binary beats and boozy bits! It's the digital pirate's drink of choice, blending bytes and booze into a chaotic concoction that'll have your circuits buzzing and your sails set for adventure!",
    price: 79,
  },
  {
    slug: "codin-capsules",
    id: "4",
    image: "https://i.ibb.co/TBPDFRX/can5.png",
    title: "Codin' Capsules",
    description:
      "Codin' Capsules: Mini marvels of binary brilliance! These tiny tech treasures pack a punch, infusing your system with a dose of digital dynamism. Pop one and watch your code come alive with a burst of bytes and a sprinkle of programming magic!",
    price: 23,
  },
  {
    slug: "tin-of-terror",
    id: "5",
    image: "https://i.ibb.co/tJB3r74/can4.png",
    title: "Tin of terror",
    description:
      "Tin of Terror: A festering vault of frightful fetishes! Within its corroded shell lies a trove of nightmares, each more grotesque than the last. Crack open the lid and unleash a putrid maelstrom of foul odors and spine-chilling horrors, guaranteed to turn even the strongest stomachs!",
    price: 89,
  },
  {
    slug: "anodized-angular-juice",
    id: "6",
    image: "https://i.ibb.co/983gRJ8/can10.png",
    title: "Anodized Angular Juice",
    description:
      "Anodized Angular Juice: It's like blending the exhilarating rush of debugging with the zesty tang of code optimization, then sprinkling in a dash of browser compatibility magic, all served in a flask forged from the finest titanium alloys and garnished with pixel-perfect CSS confetti.",
    price: 42,
  },
  {
    slug: "svelte-svavelsyra",
    id: "7",
    image: "https://i.ibb.co/Xz0q0ht/can8.png",
    title: "Svelte Svavelsyra",
    description:
      "Svelte Svavelsyra Serum: A clandestine elixir concocted from the alchemical fusion of svelte sophistication and the electrifying essence of web development wizardry. It's as if the very fabric of CSS itself has been woven with the mystic threads of JavaScript, resulting in a potion that whispers secrets of streamlined code and unrivaled user experiences. Imbibe cautiously, for within its bubbling depths lies the power to reshape digital realities with the subtlest of touches.",
    price: 29,
  },
  {
    slug: "vintage-vue",
    id: "8",
    image: "https://i.ibb.co/Yt6zWX2/can9.png",
    title: "Vintage Vue",
    description:
      "Vintage Vue Elixir: Crafted from the distilled essence of nostalgic web dev wisdom, aged in oak barrels once used to ferment the finest vanilla JavaScript, and infused with the ethereal aura of retro design principles. Sip it slowly to unlock a cascade of memories from the web's bygone eras, all while embracing the cutting-edge power of Vue.js",
    price: 42,
  },
];
