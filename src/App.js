import { useState } from 'react';
import rgbCmyk from 'rgb-cmyk';

import Swatch from './components/Swatch';
import Mix from './components/Mix';
import Fade from './components/Fade';
import Score from './components/Score';
import History from './components/History';

const PRIMES = [10000000019, 31];

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
  const maxes = partsArray.map((el, idx) => generateRandom(max, string.slice((idx * 4), (idx * 4) + 4)));
  maxes[3] = 30;

  return maxes;
}

export function getColorByDate(date) {
  const rawDigits = BigInt(date * PRIMES[0] / PRIMES[1]);
  const isEven = rawDigits % 2n === 0
  const start = isEven ? 4 : 5;
  const end = isEven ? 20 : 21;
  const string = rawDigits.toString().slice(start, end);
  const [maxC, maxM, maxY, maxB] = getMaxes(string);

  return {
    cyan: generateRandom(maxC || 1, string.substr(0, 4)),
    magenta: generateRandom(maxM || 1, string.substr(4, 4)),
    yellow: generateRandom(maxY || 1, string.substr(8, 4)),
    black: generateRandom(maxB || 1, string.substr(12, 4)),
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
