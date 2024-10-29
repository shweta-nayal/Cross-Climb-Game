import React from 'react';
import './VictoryPage.css';
import { useEffect, useState } from 'react';
import { useTimer } from '../contexts/TimerContext';

function VictoryPage({ }) {
  const [teamName, setTeamName] = useState('');
 
  const { time, stopTimer } = useTimer();

  useEffect(() => {
    stopTimer(); // Stop the timer when reaching the victory page
  }, [stopTimer]);

  useEffect(() => {
    // Retrieve team name from local storage
    const storedTeamName = localStorage.getItem('teamName');
    setTeamName(storedTeamName || 'Team');
  }, []);

  return (
    <div className="victory-container">
      <div className="victory-banner">
        <h1>Yayy..!! You Won..!!</h1>
        <p className="team-name-message">🎉Congratulations,
            <span> {teamName}</span>
            ..!!🎉</p>
        <p className="team-name-message">You took : {Math.floor(time / 60)} min {time % 60} sec</p>
      </div>
      <button className="play-again-button" onClick={() => window.location.href = '/'}>
        Play Again
      </button>
    </div>
  );
}

export default VictoryPage;
