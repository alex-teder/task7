export function generateId(length = 6) {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function allCharsUnique(str: string): boolean {
  const charSet = new Set();
  for (const char of str) {
    if (charSet.has(char)) return false;
    charSet.add(char);
  }
  return true;
}

export function allCharsNumeric(str: string): boolean {
  return /^[0-9]+$/.test(str);
}
