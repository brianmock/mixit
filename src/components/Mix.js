import cmykRgb from 'cmyk-rgb';
import ColorToggle from './ColorToggle';

export default function Mix({ setStep, myColor, setMyColor
}) {
  const { cyan, magenta, yellow, black } = myColor;

  const [r, g, b] = cmykRgb([cyan / 100, magenta / 100, yellow / 100, black / 100]);

  return (
    <div
      style={{
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{ margin: '1rem', position: 'absolute', top: 0, left: 0, }}>
        <ColorToggle color={cyan} setMyColor={setMyColor} name="cyan" />
      </div>
      <div style={{ margin: '1rem', position: 'absolute', top: 0, right: 0, }}>
        <ColorToggle color={magenta} setMyColor={setMyColor} name="magenta" />
      </div>
      <div style={{ margin: '1rem', position: 'absolute', bottom: 0, left: 0, }}>
        <ColorToggle color={yellow} setMyColor={setMyColor} name="yellow" />
      </div>
      <div style={{ margin: '1rem', position: 'absolute', bottom: 0, right: 0, }}>
        <ColorToggle color={black} setMyColor={setMyColor} name="black" />
      </div>
      <div style={{ display: 'flex', alignSelf: 'center'  }}>
        <button
          onClick={() => setStep(2)}
          style={{
            background: 'transparent',
            textShadow: '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
            fontSize: '2rem',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          I'm done
        </button>
      </div>
    </div>
  );
}
