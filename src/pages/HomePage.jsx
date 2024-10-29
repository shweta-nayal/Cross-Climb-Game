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
    </div>
  );
}

export default HomePage;
