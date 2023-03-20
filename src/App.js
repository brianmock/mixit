import { useState } from 'react';
import rgbCmyk from 'rgb-cmyk';

import Swatch from './components/Swatch';
import Mix from './components/Mix';
import Fade from './components/Fade';
import Score from './components/Score';
import History from './components/History';

const PRIMES = [514229, 28];

function hashCode(input) {
  return [...input].reduce((hash, chr) => {
    return hash * 33 + chr.charCodeAt(0);
  }, 0);
}

function generateRandom(maxInt, stringParam) {
  return hashCode(stringParam) % maxInt;
}

function getMaxes(string) {
  const max = 100;
  const partsArray = Array(4).fill(null);
  const maxes = partsArray.map((el, idx) => generateRandom(max, string.substr((idx * 4), 4)));

  return maxes;
}

export function getColorByDate(date) {
  const string = (date / PRIMES[0] * PRIMES[1] ).toString().substr(0, 16);
  const [maxC, maxM, maxY, maxB] = getMaxes(string);

  return {
    cyan: generateRandom(maxC, string.substr(0, 4)),
    magenta: generateRandom(maxM, string.substr(4, 4)),
    yellow: generateRandom(maxY, string.substr(8, 4)),
    black: generateRandom(maxB, string.substr(12, 4)),
  };
}

function App() {
  const date = new Date(new Date().toLocaleDateString()).valueOf();
  const score = localStorage.getItem(new Date().toLocaleDateString()) !== null;
  const [myColor, setMyColor] = useState({ cyan: 0, magenta: 0, yellow: 0, black: 0 });
  const [step, setStep] = useState(score ? 3 : 0);

  const todaysColor = getColorByDate(date);

  const steps = {
    0: <Swatch setStep={setStep} todaysColor={todaysColor} />,
    1: <Mix setMyColor={setMyColor} myColor={myColor} setStep={setStep} />,
    2: <Fade setStep={setStep} myColor={myColor} todaysColor={todaysColor} />,
    3: <Score myColor={myColor} todaysColor={todaysColor} setStep={setStep} />,
    4: <History />
  };

  return steps[step];
}

export default App;
