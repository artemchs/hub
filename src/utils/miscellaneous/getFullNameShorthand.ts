/**
 * Generates a shorthand from a full name.
 * The shorthand will be a maximum of two characters.
 *
 * @param {string} name - The full name to generate a shorthand for.
 * @returns {string} The shorthand of the name.
 */
export default function getFullNameShorthand(name: string): string {
  // Split the name by spaces to get individual words
  const words = name.split(" ");

  // If there's only one word, return the first two characters of that word
  if (words.length === 1) {
    return (words[0]?.substring(0, 2) ?? "").toUpperCase();
  }

  // Otherwise, return the first character of the first two words
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase();
}
