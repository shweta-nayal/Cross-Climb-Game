// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware to parse JSON requests
// app.use(cors());
// app.use(express.json());

// // Correct answers for levels 1, 2, and 3
// const correctAnswers = {
//   1: [
//       [['b', 'y', 't', 'e', ''], ['B', 'Y', 'T', 'E', ''], ['B', 'y', 't', 'e', '']],
//       [['m', 'o', 'd', 'e', 'm'], ['M', 'O', 'D', 'E', 'M'], ['M', 'o', 'd', 'e', 'm']],
//       [['v', 'i', 'r', 'u', 's'], ['V', 'I', 'R', 'U', 'S'], ['V', 'i', 'r', 'u', 's']],
//       [['f', 'l', 'a', 's', 'h'], ['F', 'L', 'A', 'S', 'H'], ['F', 'l', 'a', 's', 'h']]
//   ],
//   2: [
//       [['h', 't', 't', 'p', 's'], ['H', 'T', 'T', 'P', 'S'], ['H', 't', 't', 'p', 's'], ['', '', '', '', '']],
//       [['h', 'a', 's', 'h', ''], ['H', 'A', 'S', 'H', ''], ['H', 'a', 's', 'h', '']],
//       [['g', 'r', 'a', 'p', 'h'], ['G', 'R', 'A', 'P', 'H'], ['G', 'r', 'a', 'p', 'h']],
//       [['m', 'a', 'c', 'O', 'S'], ['M', 'A', 'C', 'O', 'S'], ['m', 'a', 'c', 'o', 's']]
//   ],
//   3: [
//       [['s', 'm', 't', 'p', ''], ['S', 'M', 'T', 'P', ''], ['S', 'm', 't', 'p', 'e']],
//       [['t', 'a', 'b', 'l', 'e'], ['T', 'A', 'B', 'L', 'E'], ['T', 'a', 'b', 'l', 'e']],
//       [['I', 'O', 'T', '', ''], ['i', 'o', 't', '', ''], ['I', 'o', 't', '', '']],
//       [['l', 'a', 'n', '', ''], ['L', 'A', 'N', '', ''], ['L', 'a', 'n', '', '']]
//   ]
// };

// // Function to validate user answers for a given level
// const validateAnswers = (userAnswers, level) => {
//   const correctLevelAnswers = correctAnswers[level];
//   if (!correctLevelAnswers) return false;

//   // Compare each row of user answers with the correct answers
//   return userAnswers.every((row, rowIndex) =>
//     correctLevelAnswers[rowIndex].every(
//       (answer, charIndex) => answer.toLowerCase() === row[charIndex].toLowerCase()
//     )
//   );
// };

// // POST endpoint to check answers
// app.post('/check-answers', (req, res) => {
//   const { level, answers } = req.body;
//   const isValid = validateAnswers(answers, level);

//   res.json({ isValid });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });











const express = require('express');
const path = require('path');
const cors = require('cors'); // To enable CORS if using different ports for frontend and backend

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enables CORS, helpful during development
app.use(express.json()); // To handle JSON requests
app.use(express.static(path.join(__dirname, '../build'))); // Serve static files from build folder

// Sample endpoint for checking answers
app.post('/check-answers', (req, res) => {
  const { answers } = req.body;
  
  // Mockup for processing answers:
 const correctAnswers = {
  1: [
      [['b', 'y', 't', 'e', ''], ['B', 'Y', 'T', 'E', ''], ['B', 'y', 't', 'e', '']],
      [['m', 'o', 'd', 'e', 'm'], ['M', 'O', 'D', 'E', 'M'], ['M', 'o', 'd', 'e', 'm']],
      [['v', 'i', 'r', 'u', 's'], ['V', 'I', 'R', 'U', 'S'], ['V', 'i', 'r', 'u', 's']],
      [['f', 'l', 'a', 's', 'h'], ['F', 'L', 'A', 'S', 'H'], ['F', 'l', 'a', 's', 'h']]
  ],
  2: [
      [['h', 't', 't', 'p', 's'], ['H', 'T', 'T', 'P', 'S'], ['H', 't', 't', 'p', 's'], ['', '', '', '', '']],
      [['h', 'a', 's', 'h', ''], ['H', 'A', 'S', 'H', ''], ['H', 'a', 's', 'h', '']],
      [['g', 'r', 'a', 'p', 'h'], ['G', 'R', 'A', 'P', 'H'], ['G', 'r', 'a', 'p', 'h']],
      [['m', 'a', 'c', 'O', 'S'], ['M', 'A', 'C', 'O', 'S'], ['m', 'a', 'c', 'o', 's']]
  ],
  3: [
      [['s', 'm', 't', 'p', ''], ['S', 'M', 'T', 'P', ''], ['S', 'm', 't', 'p', 'e']],
      [['t', 'a', 'b', 'l', 'e'], ['T', 'A', 'B', 'L', 'E'], ['T', 'a', 'b', 'l', 'e']],
      [['I', 'O', 'T', '', ''], ['i', 'o', 't', '', ''], ['I', 'o', 't', '', '']],
      [['l', 'a', 'n', '', ''], ['L', 'A', 'N', '', ''], ['L', 'a', 'n', '', '']]
  ]
};
  const results = answers.map((answer, index) => ({
    correct: answer === correctAnswers[index]
  }));

  const allCorrect = results.every(result => result.correct);

  if (allCorrect) {
    return res.json({ success: true, message: "All answers are correct!" });
  } else {
    return res.json({ success: false, message: "Check your answers and try again.", results });
  }
});

// Handle client-side routing by sending index.html for any unhandled route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
