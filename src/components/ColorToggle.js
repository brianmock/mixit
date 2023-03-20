import { useState } from 'react';

const COLORS = {
  'cyan': '#00FFFF',
  'magenta': '#FF00FF',
  'yellow': '#ffff00',
  'black': '#000000'
};

export default function ColorToggle({ color, setMyColor, name }) {
  const [plusInterval, setPlusInterval] = useState(null);
  const [minusInterval, setMinusInterval] = useState(null);

  const lessDisabled = color <= 0;
  const moreDisabled = color >= 100;

  if (lessDisabled && minusInterval) {
    clearInterval(minusInterval);
    setMinusInterval(null);
  }

  if (moreDisabled && plusInterval) {
    clearInterval(plusInterval);
    setPlusInterval(null);
  }

  const handleStartSubtractColor = () => {
    const interval = setInterval(() => setMyColor(prevState => ({
      ...prevState,
      [name]: lessDisabled ? 0 : prevState[name] - 1,
    })), 100);

    setMinusInterval(interval);
  };

  const handleEndSubtractColor = () => {
    minusInterval && clearInterval(minusInterval)
    setMinusInterval(null);
  }

  const handleStartAddColor = () => {
    const interval = setInterval(() => setMyColor(prevState => ({
      ...prevState,
      [name]: moreDisabled ? 100 : prevState[name] + 1,
    })), 100);

    setPlusInterval(interval);
  };

  const handleEndAddColor = () => {
    plusInterval && clearInterval(plusInterval)
    setPlusInterval(null);
  }

  const disabledColor = name === 'black' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const sharedStyle = {
    userSelect: 'none',
    height: '10rem',
    width: '5rem',
    fontSize: '6rem',
    paddingBottom: '0.5rem',
    textShadow: '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
    outline: 'none',
    border: 'none',
    transition: 'all 500ms linear',
  };

  return (
    <div style={{
      borderRadius: '5rem',
      height: '10rem',
      width: '10rem',
      backgroundColor: COLORS[name],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }} >
      <button
        style={{
          ...sharedStyle,
          backgroundColor: lessDisabled ? disabledColor : 'transparent',
          borderRadius: '7.5rem 0 0 7.5rem',
          color: lessDisabled ? '#ddd' : '#fff',
          cursor: lessDisabled ? 'not-allowed' : 'pointer',
        }}
        disabled={lessDisabled}
        onMouseDown={handleStartSubtractColor}
        onTouchStart={handleStartSubtractColor}
        onMouseUp={handleEndSubtractColor}
        onTouchEnd={handleEndSubtractColor}
      >
        -
      </button>
      <button
        style={{
          ...sharedStyle,
          backgroundColor: moreDisabled ? disabledColor : 'transparent',
          borderRadius: '0 7.5rem 7.5rem 0',
          color: moreDisabled ? '#ddd' : '#fff',
          cursor: moreDisabled ? 'not-allowed' : 'pointer',
        }}
        disabled={moreDisabled}
        onMouseDown={handleStartAddColor}
        onTouchStart={handleStartAddColor}
        onMouseUp={handleEndAddColor}
        onTouchEnd={handleEndAddColor}
      >
        +
      </button>
    </div>
  );
}
