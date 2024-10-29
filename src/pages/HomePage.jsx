import React, { useState } from 'react';
import { useTimer } from '../contexts/TimerContext';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const [teamName, setTeamName] = useState('');
  const { startTimer } = useTimer();
  const navigate = useNavigate();

  const handleStart = () => {
    if (teamName.trim()) {
      //Storing team name name in local storage for access in other components
      localStorage.setItem('teamName', teamName);
      startTimer();
      navigate('/game'); // Redirect to the game page
    } 
    else {
      alert("Please enter a team name to proceed!");
    }
  };

  return (
    <div className="homepage-container">
      <h1>Welcome to Cross-Climb Game</h1>
      <p>Enter your name to begin the adventure..!!</p>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="team-input"
      />

      <button onClick={handleStart} className="start-button">
        Start
      </button>

      <div className="game-guide">
                <h3>How to Play : </h3>
                <p><strong>1. Start the Game:</strong> Enter your Team Name and click Start.</p>
                <p><strong>2. Submit Answers:</strong> Once all answers are complete, click Finish to submit. All answers must be correct for submission to succeed; otherwise, an error message will prompt you to re-check your answers.</p>
                <p><strong>3. Advance Levels:</strong> Complete each level successfully to move on to the next. Your total time from start will be tracked.</p>
                <p><strong>4. Victory Screen:</strong> Upon completing the final level, you'll see a congratulatory message with your team name and total time taken.</p>
                <p><strong>5. Play Again:</strong> Click Play Again to restart the game and try to beat your previous time..!!</p>
      </div>

    </div>
  );
}

export default HomePage;
