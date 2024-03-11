import fs from "fs";

// File path to the text file
const filePath = "./sameWords.txt";

// Read the words from the file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Split the data into an array of words
  const words = data.split("\n");

  // Function to remove empty strings and quotes around each word
  const cleanedWords = words
    .filter((word) => word.trim() !== "")
    .map((word) => word.trim());

  // Convert the array into a JavaScript representation
  const jsArray = `const words = [${cleanedWords
    .map((word) => `"${word}"`)
    .join(", ")}];`;

  // Write the JavaScript array to a new file
  fs.writeFile("sameWords.js", jsArray, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("JavaScript array has been saved to words.js");
  });
});
