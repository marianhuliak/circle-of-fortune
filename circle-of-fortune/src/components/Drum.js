import React, { useState } from "react";
import "./Drum.css";
import arrow from "../images/arrow.svg";

const mockDrumItems = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  value: index + 1,
}));

const Drum = () => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const promiseAfterTimeout = (seconds) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), seconds * 1000);
    });
  };

  const rotateWheel = (degr) => {
    const wheel = document.querySelector(".wheel");
    wheel.style.transform = `rotate(${degr}deg)`;
    return promiseAfterTimeout(3);
  };

  const randomDegrees = () => {
    const randomFloat = Math.random() * 360;
    return (
      Math.round(randomFloat / (360 / mockDrumItems.length)) *
      (360 / mockDrumItems.length)
    );
  };

  const getSectorColor = (index) => {
    return index % 2 === 0 ? "black" : "red";
  };

  const launchSpin = async () => {
    setSpinning(true);
    
    const totalSpins = 3; 
    

    const newRotation = currentRotation + (totalSpins * 360) + randomDegrees(); 
    
    await rotateWheel(newRotation);
    
    const segmentCount = Math.floor(newRotation / (360 / mockDrumItems.length));
    setCurrentRotation(newRotation);
    setSpinning(false);
  };

  return (
    <div className="wheel-container">
      <div className={`wheel ${spinning ? "rotating" : ""}`}>
        {mockDrumItems.map((item) => {
          const angle = (360 / mockDrumItems.length) * (item.id - 1);
          const color = getSectorColor(item.id + 1);
          return (
            <div

              key={item.id}
              className={`sector sector-${item.id}`}
              style={{

                backgroundColor: color,
                transform: `rotate(${angle}deg)`,

              }}
            >
         <div className="value">{item.value}</div>
            </div>
          );
        })}
      </div>

      <div className="arrow-container">
        <img src={arrow} alt="arrow" className="arrow" />
      </div>
      <button
        className="spin"
        role="button"
        onClick={launchSpin}
        disabled={spinning}
      >
        КРУТИТИ
      </button>
    </div>
  );
};

export default Drum;
