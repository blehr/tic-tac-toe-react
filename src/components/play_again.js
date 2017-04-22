import React from 'react';


const PlayAgain = ({ message, handleClick, activeClass, buttonMessage }) => (
  <div className={activeClass}>
    <h2>{message}</h2>
    <button className="reset-button" onClick={handleClick} >{buttonMessage}</button>
  </div>
);

export default PlayAgain;
