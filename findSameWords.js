import fs from "fs";
import { russianWords } from "./russianWords.js";
import { bulgarianWords } from "./bulgarianWords.js";

// Function to find the intersection of two arrays
function findSameWords(array1, array2) {
  const intersection = [];
  for (const word of array1) {
    if (array2.includes(word)) {
      intersection.push(word);
    }
  }
  return intersection;
}

// Find the same words between the two arrays
const sameWords = findSameWords(russianWords, bulgarianWords);

// Write the same words to a new file
fs.writeFile("sameWords.txt", sameWords.join("\n"), "utf8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("Same words have been saved to sameWords.txt");
});
