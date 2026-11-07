/** 'Wi-Fi, AC,  TV' → ['Wi-Fi', 'AC', 'TV'] */
export const splitCommaList = (text: string): string[] =>
  text
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

export const joinCommaList = (items: string[]): string => items.join(', ');

export const sortBySortOrder = <T extends { sortOrder: number }>(items: T[]): T[] =>
  [...items].sort((first, second) => first.sortOrder - second.sortOrder);
