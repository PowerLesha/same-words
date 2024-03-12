import React, { useState } from "react";
import "./App.css";
import { sameWords } from "../sameWords";

const wordsPerPage = 10;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredWords, setFilteredWords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const filterWords = (letter) => {
    const filtered = sameWords.filter((word) => word.startsWith(letter));
    setFilteredWords(filtered);
    setCurrentPage(0); // Reset the current page to 0 when filtering
    setTotalPages(Math.ceil(filtered.length / wordsPerPage)); // Calculate total pages
  };

  const displayWords = () => {
    const startIndex = currentPage * wordsPerPage;
    const endIndex = startIndex + wordsPerPage;
    return filteredWords
      .slice(startIndex, endIndex)
      .map((word, index) => <div key={index}>{word}</div>);
  };

  const nextPage = () => {
    if ((currentPage + 1) * wordsPerPage < filteredWords.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <h1>The same words in Russian and Bulgarian</h1>
      <div className="alphabet">
        {Array.from(Array(32).keys()).map((letterIndex) => (
          <button
            key={letterIndex}
            className="letter"
            onClick={() => filterWords(String.fromCharCode(1072 + letterIndex))}
          >
            {String.fromCharCode(1072 + letterIndex)}
          </button>
        ))}
      </div>
      <div className="sameWords-container">{displayWords()}</div>
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          style={{
            borderTopLeftRadius: "10px", // Radius for the top-left corner
            borderBottomLeftRadius: "10px", // Radius for the bottom-left corner
            borderTopRightRadius: "0", // No radius for the top-right corner
            borderBottomRightRadius: "0", // No radius for the bottom-right corner
          }}
        >
          Previous
        </button>
        {totalPages > 0 && (
          <div className="page-count">
            <hr className="line" /> {/* Line above */}
            <span>
              {currentPage + 1} of {totalPages}
            </span>
            <hr className="line" /> {/* Line below */}
          </div>
        )}
        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * wordsPerPage >= filteredWords.length}
          style={{
            borderTopLeftRadius: "0", // Radius for the top-left corner
            borderBottomLeftRadius: "0", // Radius for the bottom-left corner
            borderTopRightRadius: "10px", // No radius for the top-right corner
            borderBottomRightRadius: "10px", // No radius for the bottom-right corner
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
