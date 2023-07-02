import cmykRgb from 'cmyk-rgb';
import { useState } from 'react';

import { useTodaysColor } from '../hooks/useColor';

export default function Fade({ myColor, setStep
}) {
  const todaysColor = useTodaysColor();
  const [fade, setFade] = useState(false)
  const [myR, myG, myB] = cmykRgb([myColor.cyan / 100, myColor.magenta / 100, myColor.yellow / 100, myColor.black / 100]);

  const [r, g, b] = cmykRgb([todaysColor.cyan / 100, todaysColor.magenta / 100, todaysColor.yellow / 100, todaysColor.black / 100]);

  setTimeout(() => setFade(true), 100);
  setTimeout(() => setStep(3), 3100);

  return (
    <div
      style={{
        background: fade ? `rgb(${r}, ${g}, ${b})` : `rgb(${myR}, ${myG}, ${myB})`,
        transition: 'background-color 2000ms linear',
        height: '100vh',
        width: '100vw',
      }}
    />
  );
}
