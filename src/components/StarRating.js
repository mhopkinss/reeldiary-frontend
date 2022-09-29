import React, {useState} from 'react';

function StarRating({setRate, setHove, rate}) {
    return (
        <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rate ? "on" : "off"}
            onClick={() => setRate(index)}
            onMouseEnter={() => setHove(index)}
            onMouseLeave={() => setRate(rate)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
    );
}

export default StarRating;