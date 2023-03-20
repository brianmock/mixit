import cmykRgb from 'cmyk-rgb';
import { Button } from './common';

const min = 1;
const max = 100;

export function calculateLogScore(score) {
  const logScore = (score - min) / (max - min) * (Math.log10(max) - Math.log10(min)) + Math.log10(min);

  return Math.round(Math.pow(10, logScore));
}

export default function Score({ myColor, todaysColor, setStep
}) {
  const date = new Date().toLocaleDateString();
  const storedColor = localStorage.getItem(`${date}_color`);
  const storedScore = localStorage.getItem(`${date}`);

  const [myR, myG, myB] = cmykRgb([myColor.cyan / 100, myColor.magenta / 100, myColor.yellow / 100, myColor.black / 100]);
  const [r, g, b] = cmykRgb([todaysColor.cyan / 100, todaysColor.magenta / 100, todaysColor.yellow / 100, todaysColor.black / 100]);

  const diff = Math.abs(myR - r) + Math.abs(myG - g) + Math.abs(myB - b);

  const score = Math.round((1 - (diff / 765)) * 100);

  if (!storedColor) {
    localStorage.setItem(new Date().toLocaleDateString(), score);
    localStorage.setItem(`${new Date().toLocaleDateString()}_color`, `rgba(${myR},${myG},${myB},1)`);
  }

  const gradient = storedColor ? `linear-gradient(to right, ${storedColor} 50%, rgba(${r}, ${g}, ${b}, 1) 50%)` : `linear-gradient(to right, rgba(${myR},${myG},${myB},1) 50%, rgba(${r}, ${g}, ${b}, 1) 50%)`;

  return (
    <div
      style={{
        background: gradient,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        textShadow: '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
        fontSize: '4rem',
        color: '#fff',
      }}>
      <div>Score: {storedScore || score}</div>
      <div>Hard Score: {storedScore ? calculateLogScore(storedScore) : calculateLogScore(score)}</div>
      <Button onClick={() => setStep(4)}>
        Previous scores
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem(new Date().toLocaleDateString());
          localStorage.removeItem(`${new Date().toLocaleDateString()}_color`);
          setStep(0);
        }}
      >
        reset
      </Button>
    </div>
  );
}
