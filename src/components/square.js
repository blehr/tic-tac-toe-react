import React from 'react';
import Toe from './toe';
import Tick from './tick';


const Square = ({ id, handleClick, image, space }) => {
    
    const squareImage = image === 'tick' ? <Tick /> : <Toe />;
    
    return (
        <div id={id} className="square" onClick={() => handleClick(space)} >
            {
                image && squareImage
            }
        </div>
    );
};

export default Square;
