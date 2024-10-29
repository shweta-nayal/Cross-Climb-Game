// SuccessPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';
import confettiImage from '../assets/confetti.gif';

function SuccessPage() {
  const navigate = useNavigate();

  // Automatically scroll to the top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
        <div
      className="success-page"
      style={{
        backgroundImage: `url(${confettiImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        width: '100%',
        height: '100vh',
        opacity: 0.8,
        zIndex: 1
      }}
    >
      <div className="confetti-animation"></div>
      <div className="success-banner">
        <h1>Congratulations..!!</h1>
        <p>You’ve successfully completed Level 1..!!</p>
      </div>
      
        <button className="level-button" onClick={() => navigate('/level2')}>
          Proceed to Level 2
        </button>

    </div>
  );
}

export default SuccessPage;
