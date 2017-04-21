import React from 'react';


const PlayAgain = ({ message, handleClick, activeClass }) => (
  <div className={activeClass}>
    <h2>{message}</h2>
    <button className="reset-button" onClick={handleClick} >Play Again?</button>
  </div>
);

export default PlayAgain;
