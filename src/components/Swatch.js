import cmykRgb from 'cmyk-rgb';
import { collection, addDoc } from "firebase/firestore";

import { Button } from './common';

import { db } from '../api/db';

import { useTodaysColor } from '../hooks/useColor';

export default function Swatch({ setStep }) {
  const { cyan, magenta, yellow, black } = useTodaysColor();

  const [r, g, b] = cmykRgb([cyan / 100, magenta / 100, yellow / 100, black / 100]);

  return (
    <div
      style={{
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={() => setStep(1)}
        style={{
          height: '33%',
          width: '33%',
          minWidth: '200px',
          fontSize: '4rem',
        }}
      >
        Mix it
      </Button>
    </div>
  );
}
