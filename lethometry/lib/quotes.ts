/**
 * Lethometry - Philosophy Quotes (Stoic & Buddhist)
 */

export interface Quote {
  id: string;
  text: string;
  author: string;
  tradition: 'stoic' | 'buddhist' | 'philosophical';
  tags: string[];
}

export const QUOTES: Quote[] = [
  // Stoic Quotes
  {
    id: "st-001",
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    tradition: "stoic",
    tags: ["mind", "strength", "control"]
  },
  {
    id: "st-002",
    text: "It is not death that a man should fear, but he should fear never beginning to live.",
    author: "Marcus Aurelius",
    tradition: "stoic",
    tags: ["death", "life", "beginning"]
  },
  {
    id: "st-003",
    text: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
    tradition: "stoic",
    tags: ["action", "obstacles", "growth"]
  },
  {
    id: "st-004",
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    tradition: "stoic",
    tags: ["suffering", "imagination", "reality"]
  },
  {
    id: "st-005",
    text: "Luck is what happens when preparation meets opportunity.",
    author: "Seneca",
    tradition: "stoic",
    tags: ["luck", "preparation", "opportunity"]
  },
  {
    id: "st-006",
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    tradition: "stoic",
    tags: ["excellence", "habits", "action"]
  },
  {
    id: "st-007",
    text: "No man is free who is not master of himself.",
    author: "Epictetus",
    tradition: "stoic",
    tags: ["freedom", "self-mastery", "control"]
  },
  {
    id: "st-008",
    text: "It's not what happens to you, but how you react to it that matters.",
    author: "Epictetus",
    tradition: "stoic",
    tags: ["reaction", "perspective", "control"]
  },
  {
    id: "st-009",
    text: "He who fears death will never do anything worth of a man who is alive.",
    author: "Seneca",
    tradition: "stoic",
    tags: ["death", "fear", "life"]
  },
  {
    id: "st-010",
    text: "The best revenge is to be unlike him who performed the injury.",
    author: "Marcus Aurelius",
    tradition: "stoic",
    tags: ["revenge", "forgiveness", "strength"]
  },
  {
    id: "st-011",
    text: "If you want to improve, be content to be thought foolish and stupid.",
    author: "Epictetus",
    tradition: "stoic",
    tags: ["improvement", "humility", "learning"]
  },
  {
    id: "st-012",
    text: "We have two ears and one mouth so that we can listen twice as much as we speak.",
    author: "Epictetus",
    tradition: "stoic",
    tags: ["listening", "communication", "wisdom"]
  },
  {
    id: "st-013",
    text: "Man is not worried by real problems so much as by his imagined anxieties about real problems.",
    author: "Epictetus",
    tradition: "stoic",
    tags: ["anxiety", "imagination", "worry"]
  },
  {
    id: "st-014",
    text: "Begin at once to live, and count each separate day as a separate life.",
    author: "Seneca",
    tradition: "stoic",
    tags: ["living", "time", "presence"]
  },
  {
    id: "st-015",
    text: "Difficulties strengthen the mind, as labor does the body.",
    author: "Seneca",
    tradition: "stoic",
    tags: ["difficulties", "strength", "mind"]
  },

  // Buddhist Quotes
  {
    id: "bd-001",
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["mind", "thoughts", "becoming"]
  },
  {
    id: "bd-002",
    text: "In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["love", "living", "letting-go"]
  },
  {
    id: "bd-003",
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["present", "mindfulness", "concentration"]
  },
  {
    id: "bd-004",
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["peace", "within", "mindfulness"]
  },
  {
    id: "bd-005",
    text: "Thousands of candles can be lit from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["happiness", "sharing", "generosity"]
  },
  {
    id: "bd-006",
    text: "The root of suffering is attachment.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["suffering", "attachment", "roots"]
  },
  {
    id: "bd-007",
    text: "Three things cannot be long hidden: the sun, the moon, and the truth.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["truth", "reality", "hidden"]
  },
  {
    id: "bd-008",
    text: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["anger", "letting-go", "suffering"]
  },
  {
    id: "bd-009",
    text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["love", "self-worth", "affection"]
  },
  {
    id: "bd-010",
    text: "Every morning we are born again. What we do today is what matters most.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["rebirth", "today", "action"]
  },
  {
    id: "bd-011",
    text: "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["health", "contentment", "wealth"]
  },
  {
    id: "bd-012",
    text: "There is no path to happiness: happiness is the path.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["happiness", "path", "journey"]
  },
  {
    id: "bd-013",
    text: "What you think, you become. What you feel, you attract. What you imagine, you create.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["thoughts", "feelings", "creation"]
  },
  {
    id: "bd-014",
    text: "The trouble is, you think you have time.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["time", "urgency", "death"]
  },
  {
    id: "bd-015",
    text: "When you realize how perfect everything is, you will tilt your head back and laugh at the sky.",
    author: "Buddha",
    tradition: "buddhist",
    tags: ["perfection", "laughter", "wisdom"]
  },

  // Philosophical Quotes
  {
    id: "ph-001",
    text: "I think, therefore I am.",
    author: "René Descartes",
    tradition: "philosophical",
    tags: ["thinking", "existence", "consciousness"]
  },
  {
    id: "ph-002",
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    tradition: "philosophical",
    tags: ["examination", "life", "wisdom"]
  },
  {
    id: "ph-003",
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    tradition: "philosophical",
    tags: ["purpose", "life", "meaning"]
  },
  {
    id: "ph-004",
    text: "God is dead. God remains dead. And we have killed him.",
    author: "Friedrich Nietzsche",
    tradition: "philosophical",
    tags: ["death", "religion", "nihilism"]
  },
  {
    id: "ph-005",
    text: "One cannot step twice in the same river.",
    author: "Heraclitus",
    tradition: "philosophical",
    tags: ["change", "time", "reality"]
  },
  {
    id: "ph-006",
    text: "The only thing I know is that I know nothing.",
    author: "Socrates",
    tradition: "philosophical",
    tags: ["knowledge", "humility", "wisdom"]
  },
  {
    id: "ph-007",
    text: "Life must be understood backward, but it must be lived forward.",
    author: "Søren Kierkegaard",
    tradition: "philosophical",
    tags: ["life", "understanding", "time"]
  },
  {
    id: "ph-008",
    text: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.",
    author: "Jean-Paul Sartre",
    tradition: "philosophical",
    tags: ["freedom", "responsibility", "existence"]
  },
  {
    id: "ph-009",
    text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
    author: "Albert Camus",
    tradition: "philosophical",
    tags: ["freedom", "rebellion", "existence"]
  },
  {
    id: "ph-010",
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson",
    tradition: "philosophical",
    tags: ["self", "authenticity", "individuality"]
  },
  {
    id: "ph-011",
    text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
    author: "Ralph Waldo Emerson",
    tradition: "philosophical",
    tags: ["purpose", "life", "meaning"]
  },
  {
    id: "ph-012",
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    tradition: "philosophical",
    tags: ["life", "plans", "reality"]
  },
  {
    id: "ph-013",
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    tradition: "philosophical",
    tags: ["life", "continuity", "wisdom"]
  },
  {
    id: "ph-014",
    text: "The only thing we have to fear is fear itself.",
    author: "Franklin D. Roosevelt",
    tradition: "philosophical",
    tags: ["fear", "courage", "overcoming"]
  },
  {
    id: "ph-015",
    text: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi",
    tradition: "philosophical",
    tags: ["change", "action", "leadership"]
  }
];

/**
 * Get random quote
 */
export function getRandomQuote(): Quote {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

/**
 * Get quote by ID
 */
export function getQuoteById(id: string): Quote | undefined {
  return QUOTES.find(q => q.id === id);
}

/**
 * Get quotes by tradition
 */
export function getQuotesByTradition(tradition: 'stoic' | 'buddhist' | 'philosophical'): Quote[] {
  return QUOTES.filter(q => q.tradition === tradition);
}

/**
 * Get quotes by tag
 */
export function getQuotesByTag(tag: string): Quote[] {
  return QUOTES.filter(q => q.tags.includes(tag));
}

/**
 * Get motivational quote based on life complete percent
 */
export function getMotivationalQuote(lifeCompletePercent: number): Quote {
  if (lifeCompletePercent < 30) {
    // Early life - focus on beginnings and potential
    return QUOTES.find(q => q.tags.includes('life') && q.tags.includes('beginning')) || getRandomQuote();
  } else if (lifeCompletePercent < 60) {
    // Mid life - focus on action and meaning
    return QUOTES.find(q => q.tags.includes('action') || q.tags.includes('purpose')) || getRandomQuote();
  } else if (lifeCompletePercent < 90) {
    // Later life - focus on wisdom and reflection
    return QUOTES.find(q => q.tags.includes('wisdom') || q.tags.includes('time')) || getRandomQuote();
  } else {
    // Near end - focus on acceptance and peace
    return QUOTES.find(q => q.tags.includes('peace') || q.tags.includes('letting-go')) || getRandomQuote();
  }
}
