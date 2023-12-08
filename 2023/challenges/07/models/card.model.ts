export const CardsString = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'] as const;
export type TCard = typeof CardsString[number];