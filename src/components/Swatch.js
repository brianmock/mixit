import cmykRgb from 'cmyk-rgb';

export default function Swatch({ todaysColor, setStep }) {
  const { cyan, magenta, yellow, black } = todaysColor;

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
      <button
        onClick={() => setStep(1)}
        style={{
          backgroundColor: 'transparent',
          height: '33%',
          width: '33%',
          minWidth: '200px',
          fontWeight: 'bold',
          textShadow: '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
          fontSize: '4rem',
          color: '#fff',
        }}
      >Mix it</button>
    </div>
  );
}
