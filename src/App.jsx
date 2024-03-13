import React, { useState } from "react";
import "./App.css";
import { sameWords } from "../sameWords";
import { FaTimes, FaSearch } from "react-icons/fa";

const wordsPerPage = 10;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredWords, setFilteredWords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [wordsWithLetter, setWordsWithLetter] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [wordExists, setWordExists] = useState(null);
  const [checkWordVisible, setCheckWordVisible] = useState(false);

  const filterWords = (letter) => {
    const filtered = sameWords.filter((word) => word.startsWith(letter));
    setFilteredWords(filtered);
    setCurrentLetter(letter);
    setCurrentPage(0); // Reset the current page to 0 when filtering
    setWordsWithLetter(filtered.length);
    setTotalPages(Math.ceil(filtered.length / wordsPerPage)); // Calculate total pages
  };

  const checkWordExists = () => {
    const lowercaseWord = searchWord.toLowerCase();
    setWordExists(sameWords.includes(lowercaseWord));
  };

  const displayWords = () => {
    const startIndex = currentPage * wordsPerPage;
    const endIndex = startIndex + wordsPerPage;
    const wordsToDisplay = filteredWords.slice(startIndex, endIndex);

    return (
      <div className="word-grid">
        {wordsToDisplay.map((word, index) => (
          <div key={index} className="word-item">
            {word}
          </div>
        ))}
      </div>
    );
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
      <div className="search-container">
        <div
          className="popup-trigger"
          onClick={() => setCheckWordVisible(!checkWordVisible)}
        >
          Also you can check if the same words exist in Russian and Bulgarian by
          clicking on this icon
          {checkWordVisible ? (
            <FaTimes className="icon" />
          ) : (
            <FaSearch className="icon" />
          )}
        </div>
        {checkWordVisible && (
          <div className="popup-content">
            <input
              type="text"
              placeholder="Enter a word"
              className="check-input"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <button className="check-button" onClick={checkWordExists}>
              Check
            </button>
            {wordExists && <div>The word exists in Russian and Bulgarian.</div>}
            {wordExists === false && (
              <div>The word does not exist in Russian and Bulgarian.</div>
            )}
            {wordExists === null && ""}
          </div>
        )}
      </div>
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
      <div className="word-count">
        {wordsWithLetter > 0 ? (
          <span>
            {wordsWithLetter} words start with {currentLetter?.toUpperCase()}
          </span>
        ) : (
          currentLetter && (
            <span>
              There aren't words start with {currentLetter.toUpperCase()}
            </span>
          )
        )}
      </div>
      <div className="words-container">{displayWords()}</div>

      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          style={{
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
          }}
        >
          Previous
        </button>
        {totalPages > 0 && (
          <div className="page-count">
            <hr className="line" />
            <span>
              {currentPage + 1} of {totalPages}
            </span>
            <hr className="line" />
          </div>
        )}
        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * wordsPerPage >= filteredWords.length}
          style={{
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
