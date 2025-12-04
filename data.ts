
import { Dish, Wine, LearningTrack, Tag } from './types';

// --- Tags ---
export const tags: Record<string, Tag> = {
  vegan: { id: 't1', label: 'Vegan', type: 'diet' },
  gf: { id: 't2', label: 'Gluten Free', type: 'diet' },
  rich: { id: 't3', label: 'Rich', type: 'flavor' },
  citrus: { id: 't4', label: 'Citrus', type: 'flavor' },
  spicy: { id: 't5', label: 'Spicy', type: 'flavor' },
  umami: { id: 't6', label: 'Umami', type: 'flavor' },
  sweet: { id: 't7', label: 'Sweet', type: 'flavor' },
  lactoseFree: { id: 't8', label: 'Lactose Free', type: 'diet' },
};

// --- Wines (Specific Liberwijn Selection) ---
export const wines: Wine[] = [
  {
    id: 'w1',
    name: 'Familia Ontañón Reserva',
    producer: 'Bodegas Ontañón',
    producerDescription: 'Bodegas Ontañón is a 5th generation family estate in Rioja Baja. They are famous for their high-altitude vineyards which add freshness to the traditional rich Rioja style.',
    producerImage: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=800', // Vineyard Landscape
    region: 'Rioja',
    country: 'Spain',
    grapes: ['Tempranillo', 'Graciano'],
    vintage: '2015',
    color: 'Red',
    style: 'Bold',
    priceGlass: 12.5,
    priceBottle: 65,
    description: 'A masterpiece from 2015. Deep ruby color, complex aromas of ripe black fruit, mocha, and toasted oak. Silky structure with a very long finish.',
    pairingPitch: 'The maturity and oak structure pair perfectly with the richness of the dish.',
    image: 'https://liberwijn.nl/cdn/shop/files/2015_Familia_Ontanon_Reserva_Tempranillo_1.webp', 
    tags: ['Reserva', 'Oak Aged'],
  },
  {
    id: 'w2',
    name: 'Corvezzo Rosé Venezia DOC',
    producer: 'Corvezzo',
    producerDescription: 'Corvezzo is 100% organic and sustainable winery located near Treviso. They specialize in "clean farming" to express the purest fruit flavors.',
    producerImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', // Green Vineyard
    region: 'Veneto',
    country: 'Italy',
    grapes: ['Glera', 'Pinot Nero'],
    vintage: '2022',
    color: 'Rosé',
    style: 'Fruity',
    priceGlass: 9.5,
    priceBottle: 48,
    description: 'Organic sparkling rosé. Elegant notes of wild strawberries and acacia flowers. Fresh, lively, and sustainably farmed.',
    pairingPitch: 'The bubbles and red fruit notes lift the palate and cleanse fatty flavors.',
    image: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?auto=format&fit=crop&q=80&w=800', // Reliable Rosé placeholder
    tags: ['Organic', 'Vegan'],
  },
  {
    id: 'w3',
    name: 'Champagne Lombard Premier Cru Rosé',
    producer: 'Champagne Lombard',
    producerDescription: 'Based in Épernay, Lombard focuses on terroir-driven Champagnes with low dosage (sugar) to highlight the purity of the grapes.',
    producerImage: 'https://images.unsplash.com/photo-1598153346810-860daa0d6cad?auto=format&fit=crop&q=80&w=800', // Cellar/Barrel
    region: 'Champagne',
    country: 'France',
    grapes: ['Pinot Noir', 'Chardonnay', 'Meunier'],
    vintage: 'NV',
    color: 'Sparkling',
    style: 'Mineral',
    priceBottle: 110,
    description: 'Extra Brut. A sophisticated rosé champagne with salmon hues, fine bubbles, and notes of red currant and brioche.',
    pairingPitch: 'Ultimate luxury. The crisp acidity and fine mousse cut through anything rich or fried.',
    image: 'https://images.unsplash.com/photo-1594406357463-b6574f260341?auto=format&fit=crop&q=80&w=800', // Champagne
    tags: ['Premier Cru'],
  },
  {
    id: 'w4',
    name: 'Saffraan Chenin Blanc',
    producer: 'Leenders',
    producerDescription: 'Leenders wines are crafted with minimal intervention in Paarl. They focus on texture and phenolic ripeness, often using old barrels for fermentation.',
    producerImage: 'https://images.unsplash.com/photo-1528823872056-8c0316be25b9?auto=format&fit=crop&q=80&w=800', // South African landscape
    region: 'Paarl',
    country: 'South Africa',
    grapes: ['Chenin Blanc'],
    vintage: '2024',
    color: 'White',
    style: 'Fruity',
    priceGlass: 10.5,
    priceBottle: 52,
    description: 'Vibrant and aromatic. Showcases yellow apple, beeswax, and a hint of spice. Beautiful texture from lees aging.',
    pairingPitch: 'Rich enough for white meat, fresh enough for seafood.',
    image: 'https://images.unsplash.com/photo-1606758696839-a6813358043c?auto=format&fit=crop&q=80&w=800', // White Wine
    tags: ['Sustainable'],
  },
  {
    id: 'w5',
    name: 'Tempranillo Blanco',
    producer: 'Contrebia',
    producerDescription: 'Contrebia is a modern cooperative in Rioja focusing on lesser-known varietals like the rare white Tempranillo mutation.',
    producerImage: 'https://images.unsplash.com/photo-1504279577054-acfeccf8ac52?auto=format&fit=crop&q=80&w=800', // Winery Architecture
    region: 'Rioja',
    country: 'Spain',
    grapes: ['Tempranillo Blanco'],
    vintage: '2023',
    color: 'White',
    style: 'Dry',
    priceGlass: 8.5,
    priceBottle: 42,
    description: 'A rare white mutation of Tempranillo. Intense aromas of tropical fruit, citrus, and white flowers.',
    pairingPitch: 'A unique conversation starter. Fruity but dry, excellent with appetizers.',
    image: 'https://images.unsplash.com/photo-1572569022788-e29f1d9326d9?auto=format&fit=crop&q=80&w=800', // White Wine
    tags: ['Rare Grape'],
  },
  {
    id: 'w6',
    name: 'Ontañón Viura Fermentado en Barrica',
    producer: 'Bodegas Ontañón',
    producerDescription: 'Bodegas Ontañón is a 5th generation family estate in Rioja Baja. They are famous for their high-altitude vineyards which add freshness to the traditional rich Rioja style.',
    producerImage: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=800',
    region: 'Rioja',
    country: 'Spain',
    grapes: ['Viura'],
    vintage: '2021',
    color: 'White',
    style: 'Bold',
    priceBottle: 58,
    description: 'Barrel-fermented white Rioja. Creamy texture, notes of vanilla, ripe pear, and pastry. Complex and gastronomic.',
    pairingPitch: 'Pairs like a light red wine. Can handle veal, pork, or rich mushroom dishes.',
    image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?auto=format&fit=crop&q=80&w=800', // Rich White/Barrel
    tags: ['Barrel Aged'],
  },
  {
    id: 'w7',
    name: 'Preiner Welschriesling',
    producer: 'Weingut Preiner',
    producerDescription: 'A boutique Austrian winery dedicated to expressing the mineral soils of Burgenland through crisp, clean white wines.',
    producerImage: 'https://images.unsplash.com/photo-1533090631333-e64da747d4cf?auto=format&fit=crop&q=80&w=800', // Austrian Vineyard
    region: 'Burgenland',
    country: 'Austria',
    grapes: ['Welschriesling'],
    vintage: '2023',
    color: 'White',
    style: 'Light',
    priceGlass: 9,
    priceBottle: 45,
    description: 'Crisp, spicy, and distinctively Austrian. Green apple, white pepper, and refreshing acidity.',
    pairingPitch: 'The ultimate palate cleanser. Cuts through fattiness and refreshes.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', // Crisp White
    tags: [],
  },
];

// --- Dishes ---
export const dishes: Dish[] = [
  {
    id: 'd1',
    name: 'Pan-Seared Scallops',
    price: 24,
    description: 'Hand-dived scallops served with a cauliflower purée and truffle foam.',
    category: 'Starter',
    allergens: ['Molluscs', 'Dairy'],
    tags: [tags.rich, tags.umami, tags.gf],
    pairingIds: ['w7', 'w3', 'w6'], // Preiner (cut), Champagne (luxury), Ontanon Viura (match weight)
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'd2',
    name: 'Roasted Seabass',
    price: 32,
    description: 'Whole fillet with lemon butter sauce and seasonal greens.',
    category: 'Main',
    allergens: ['Fish', 'Dairy'],
    tags: [tags.citrus, tags.lactoseFree],
    pairingIds: ['w5', 'w4', 'w2'], // Tempranillo Blanco, Leenders, Rose
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'd3',
    name: 'Wagyu Beef Carpaccio',
    price: 28,
    description: 'Thinly sliced A5 Wagyu, parmesan shavings, capers, olive oil.',
    category: 'Starter',
    allergens: ['Dairy'],
    tags: [tags.rich, tags.gf],
    pairingIds: ['w1', 'w3', 'w6'], // Ontanon Reserva (Classic), Champagne (Contrast), Viura (Bold White)
    image: 'https://images.unsplash.com/photo-1544025162-d76690b67f61?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'd4',
    name: 'Wild Mushroom Risotto',
    price: 26,
    description: 'Arborio rice, porcini mushrooms, parmesan crisp.',
    category: 'Main',
    allergens: ['Dairy'],
    tags: [tags.rich, tags.umami, tags.gf],
    pairingIds: ['w6', 'w1', 'w4'], // Viura (Texture match), Ontanon Reserva (Earth match), Leenders
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800',
  },
];

// --- Rich Learning Content ---
export const learningTracks: LearningTrack[] = [
  {
    id: 'track1',
    title: 'Wine Fundamentals',
    description: 'Master the basics of grapes, regions, and tasting.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800',
    progress: 65,
    totalModules: 5,
    modules: [
        {
            id: 'm1-1',
            title: 'Chardonnay 101',
            description: 'Learn why Chardonnay is called the "Winemaker\'s Canvas" and how different climates affect its flavor profile.',
            type: 'video',
            duration: '2 min',
            xp: 50,
            videoUrl: 'https://images.unsplash.com/photo-1572569022788-e29f1d9326d9?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'm1-2',
            title: 'The 5 Noble Grapes',
            type: 'article',
            duration: '4 min',
            xp: 30,
            content: [
                'In the world of wine, five specific grape varieties have established themselves as international standards due to their historical importance in French winemaking and their widespread planting globally.',
                '1. Cabernet Sauvignon',
                'Often called the "King of Reds", this grape is famous for its thick skin, which leads to wines with high tannin and structure. Typical flavors include blackcurrant, cedar, and green pepper.',
                '2. Merlot',
                'The "Velvet Glove" to Cabernet\'s "Iron Fist". Merlot ripens earlier and has thinner skins, resulting in lower tannins and higher sugar levels. Expect notes of plum, black cherry, and chocolate.',
                '3. Pinot Noir',
                'The "Heartbreak Grape" is notoriously difficult to grow but produces some of the most elegant wines in the world. It requires a cool climate and offers delicate aromas of red berries, hibiscus, and forest floor.',
                '4. Chardonnay',
                'The winemaker\'s canvas. Chardonnay itself is relatively neutral, taking on the character of its terroir and winemaking choices (like oak aging). It ranges from lean and mineral (Chablis) to rich and buttery (Napa).',
                '5. Sauvignon Blanc',
                'Known for its zesty acidity and intense aromatics. In cool climates like Marlborough, it smells of passion fruit and cut grass. In France (Sancerre), it is more flinty and restrained.'
            ]
        },
        {
            id: 'm1-3',
            title: 'Test your Palate',
            type: 'quiz',
            duration: '1 min',
            xp: 100,
            quizData: {
                question: 'Which of these wines is typically the most tannic?',
                options: ['Pinot Noir', 'Barolo (Nebbiolo)', 'Beaujolais (Gamay)', 'Provence Rosé'],
                correctIndex: 1
            }
        }
    ]
  },
  {
    id: 'track2',
    title: 'Service Excellence',
    description: 'Upselling, etiquette, and reading the guest.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800',
    progress: 20,
    totalModules: 4,
    modules: [
        {
            id: 'm2-1',
            title: 'The Art of Upselling',
            type: 'article',
            duration: '3 min',
            xp: 50,
            content: [
              'Upselling is not about tricking the guest into spending more; it is about enhancing their experience. A guest who drinks a better wine will have a better dinner.',
              'The Bridge Method',
              'Use what the guest knows as a bridge to something new. "If you typically enjoy [Safe Option], you will love [Premium Option] because it has more complexity and a longer finish."',
              'Pairing Logic',
              'Sell the match, not the bottle. "For this specific scallop dish, the acidity in this Chablis really unlocks the truffle flavors in a way the Pinot Grigio won\'t."',
              'The Sample',
              'If a bottle is already open, offering a tiny taste is the most effective sales tool in existence. It builds trust and reciprocity.'
            ]
        },
        {
            id: 'm2-2',
            title: 'Handling Complaints',
            description: 'A visual guide on the LAST method (Listen, Apologize, Solve, Thank) for handling difficult situations.',
            type: 'video',
            duration: '4 min',
            xp: 75,
            isLocked: true,
            videoUrl: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800'
        }
    ]
  },
  {
    id: 'track3',
    title: 'Food Pairing Science',
    description: 'Why acidity cuts fat and sweetness balances spice.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
    progress: 0,
    totalModules: 6,
    modules: [
        {
            id: 'm3-1',
            title: 'Fat vs. Acid',
            type: 'article',
            duration: '2 min',
            xp: 40,
            content: [
                'Concept: Acid cuts through fat like a knife.',
                'Example: Creamy sauce + Chablis.',
                'Example: Fried food + Champagne.',
                'Why: It cleanses the palate, making the next bite taste just as good as the first.'
            ]
        }
    ]
  }
];

// --- Mock Users ---
export const mockUsers = [
    { id: 1, name: "Jade W.", role: "Sommelier", initials: "JW", color: "bg-emerald-100 text-emerald-700", restaurant: "Restaurant De Demo", level: "Level 3" },
    { id: 2, name: "Marcus T.", role: "Gastheer", initials: "MT", color: "bg-blue-100 text-blue-700", restaurant: "Restaurant De Demo", level: "Level 1" },
    { id: 3, name: "Sarah L.", role: "Barman", initials: "SL", color: "bg-purple-100 text-purple-700", restaurant: "Restaurant De Demo", level: "Level 2" },
];
