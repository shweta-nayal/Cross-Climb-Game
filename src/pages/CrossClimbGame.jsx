import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/CrossClimbGame.css'; // Ensure correct path to the CSS file

function CrossClimbGame() {
  const correctAnswers = [
    [['b', 'y', 't', 'e', ''], ['B', 'Y', 'T', 'E', ''], ['B', 'y', 't', 'e', '']],
    [['m', 'o', 'd', 'e', 'm'], ['M', 'O', 'D', 'E', 'M'], ['M', 'o', 'd', 'e', 'm']],
    [['v', 'i', 'r', 'u', 's'], ['V', 'I', 'R', 'U', 'S'], ['V', 'i', 'r', 'u', 's']],
    [['f', 'l', 'a', 's', 'h'], ['F', 'L', 'A', 'S', 'H'], ['F', 'l', 'a', 's', 'h']]
  ];

  const questions = [
    "What is the main unit of information in computing..??",
    "What device allows you to connect to a wireless network..??",
    "What is the term for malicious software..??",
    "What type of memory is non-volatile and can be electrically erased..??"
  ];

  const [answers, setAnswers] = useState(Array(20).fill(''));
  const [clickedRow, setClickedRow] = useState(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (index, value, event) => {
    const updatedAnswers = [...answers];

    if (event.key === 'Backspace') {
      if (updatedAnswers[index] !== '') {
        updatedAnswers[index] = '';
      } else if (index > 0) {
        updatedAnswers[index - 1] = '';
      }
      setAnswers(updatedAnswers);
      inputRefs.current[index > 0 ? index - 1 : index].focus();
    } else if (value) {
      updatedAnswers[index] = value.slice(0, 1);
      setAnswers(updatedAnswers);

      const isEndOfRow = (index + 1) % 5 === 0;
      if (!isEndOfRow && index < 19) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFinishGame = async () => {
  const rows = [
    answers.slice(0, 5),
    answers.slice(5, 10),
    answers.slice(10, 15),
    answers.slice(15, 20),
  ];

  // Local validation
  const localValidationResults = rows.map((row, index) =>
    correctAnswers[index].some((correctRow) =>
      row.every((answer, i) => answer.toLowerCase() === correctRow[i].toLowerCase())
    )
  );

  const allCorrect = localValidationResults.every(result => result);

  if (allCorrect) {
    navigate('/success'); // Ensure this path is correct
  } else {
      setErrorMessage('Check your all answers');

      //hide the message after 4 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
};


  const handleRowClick = (rowIndex) => {
    setClickedRow(rowIndex);
  };

  return (
    <div className="game-container">
      <h1>. . . Level - 1 . . .</h1>
      <div className="grid-container">
        {[...Array(4)].map((_, rowIndex) => (
          <div key={rowIndex} className="row-container" onClick={() => handleRowClick(rowIndex)}>
            {[...Array(5)].map((_, colIndex) => {
              const boxIndex = rowIndex * 5 + colIndex;
              return (
                <input
                  key={boxIndex}
                  className="input-box"
                  type="text"
                  value={answers[boxIndex]}
                  onChange={(e) => handleInputChange(boxIndex, e.target.value, e)}
                  onKeyDown={(e) => handleInputChange(boxIndex, e.target.value, e)}
                  ref={(el) => (inputRefs.current[boxIndex] = el)}
                  maxLength="1"
                />
              );
            })}
          </div>
        ))}
      </div>

      <button className="finish-button" onClick={handleFinishGame}>
        Finish Game
      </button>

      {/* Popup Message */}
      {errorMessage && (
        <div className="error-popup">
          {errorMessage}
        </div>
      )}

      {/* Display Question for the Selected Row */}
      {clickedRow !== null && (
        <div className="question-box">
          <h2>Question for Row {clickedRow + 1}</h2>
          <p>{questions[clickedRow]}</p>
        </div>
      )}
    </div>
  );
}

export default CrossClimbGame;
