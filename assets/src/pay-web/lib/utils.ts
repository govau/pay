let idCounter = 0;

export const generateId = (prefix = "elem-") => `${prefix}${idCounter++}`;
