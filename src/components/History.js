import cmykRgb from 'cmyk-rgb';
import { Button } from './common';
import { useColorByDate } from '../hooks/useColor';
import { calculateLogScore } from './Score';

export default function History({ lastStep, user, setStep }) {
  const includeTodaysColor = lastStep === 3;
  const dates = Array.from({length: 365}, (x, i) => {
    const date = new Date();
    const traverseDateIndex = includeTodaysColor ? i : i + 1;
    date.setDate(date.getDate() - traverseDateIndex);
    return date.toLocaleDateString();
  });

  return (
    <>
      <Button style={{ margin: '0.5rem', position: 'fixed', left: 0 }} onClick={() => setStep(lastStep)}>
        Back
      </Button>
      <div
        style={{
          backgroundColor: '#DDDDDD',
          backgroundImage:  'linear-gradient(135deg, #DDDDDD 25%, transparent 25%), linear-gradient(225deg, #DDDDDD 25%, transparent 25%), linear-gradient(45deg, #DDDDDD 25%, transparent 25%), linear-gradient(315deg, #DDDDDD 25%, #F6F6F6 25%)',
          backgroundPosition:  '10px 0, 10px 0, 0 0, 0 0',
          backgroundSize: '20px 20px',
          backgroundRepeat: 'repeat',
          height: '4.25rem',
          width: '100vw',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          textShadow: '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
          color: '#fff',
          fontSize: '5vh',
        }}
      />
      {dates.map(date => {
        const { cyan, magenta, yellow, black } = useColorByDate(new Date(date).valueOf())

        const score = localStorage.getItem(date) || '';
        const color = localStorage.getItem(`${date}_color`);

        const [r, g, b] = cmykRgb([cyan / 100, magenta / 100, yellow / 100, black / 100]);
        const rgb = `rgba(${r}, ${g}, ${b}, 1)`;

        const gradient = `linear-gradient(to right, ${color || rgb} 50%, ${rgb} 50%)`;
        return (
          <div
            key={gradient}
            style={{
              background: gradient,
              height: '4.25rem',
              width: '100vw',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              textShadow: '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
              color: '#fff',
              fontSize: '5vh',
            }}>
            {score && calculateLogScore(score)}
          </div>
        );
      })}
    </>
  );
}
