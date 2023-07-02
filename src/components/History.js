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

  const isometricBG = {
    backgroundColor: '#F6F6F6',
    backgroundImage: 'linear-gradient(30deg, rgb(221, 221, 221) 12%, transparent 12.5%, transparent 87%, rgb(221, 221, 221) 87.5%, rgb(221, 221, 221)), linear-gradient(150deg, rgb(221, 221, 221) 12%, transparent 12.5%, transparent 87%, rgb(221, 221, 221) 87.5%, rgb(221, 221, 221)), linear-gradient(30deg, rgb(221, 221, 221) 12%, transparent 12.5%, transparent 87%, rgb(221, 221, 221) 87.5%, rgb(221, 221, 221)), linear-gradient(150deg, rgb(221, 221, 221) 12%, transparent 12.5%, transparent 87%, rgb(221, 221, 221) 87.5%, rgb(221, 221, 221)), linear-gradient(60deg, rgba(221, 221, 221, 0.467) 25%, transparent 25.5%, transparent 75%, rgba(221, 221, 221, 0.467) 75%, rgba(221, 221, 221, 0.467)), linear-gradient(60deg, rgba(221, 221, 221, 0.467) 25%, transparent 25.5%, transparent 75%, rgba(221, 221, 221, 0.467) 75%, rgba(221, 221, 221, 0.467))',
    backgroundSize: '20px 35px',
    backgroundPosition: '0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px',
  };

  const chevronBG = {
    backgroundColor: '#DDDDDD',
    backgroundImage:  'linear-gradient(135deg, #DDDDDD 25%, transparent 25%), linear-gradient(225deg, #DDDDDD 25%, transparent 25%), linear-gradient(45deg, #DDDDDD 25%, transparent 25%), linear-gradient(315deg, #DDDDDD 25%, #F6F6F6 25%)',
    backgroundPosition:  '10px 0, 10px 0, 0 0, 0 0',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'repeat',
  };

  const gridBG = {
    backgroundColor: '#DDDDDD',
    backgroundImage:  'linear-gradient(#F6F6F6 2px, transparent 2px), linear-gradient(90deg, #F6F6F6 2px, transparent 2px), linear-gradient(#F6F6F6 1px, transparent 1px), linear-gradient(90deg, #F6F6F6 1px, #DDDDDD 1px)',
    backgroundSize: '25px 25px, 25px 25px, 5px 5px, 5px 5px',
    backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
  }

  const triangleBG = {
    backgroundColor: '#DDDDDD',
    backgroundImage: 'linear-gradient(45deg, #F6F6F6 50%, #DDDDDD 50%)',
    backgroundSize: '10px 10px',
  }

  const squareBG = {
    backgroundColor: '#DDDDDD',
    backgroundImage:  'repeating-linear-gradient(45deg, #F6F6F6 25%, transparent 25%, transparent 75%, #F6F6F6 75%, #F6F6F6), repeating-linear-gradient(45deg, #F6F6F6 25%, #DDDDDD 25%, #DDDDDD 75%, #F6F6F6 75%, #F6F6F6)',
    backgroundPosition: '0 0, 10px 10px',
    backgroundSize: '20px 20px',
  }

  const bgOptions = [isometricBG, chevronBG, gridBG, triangleBG, squareBG];

  const bg = bgOptions[Math.floor(Math.random() * 5)];

  return (
    <>
      <Button style={{ margin: '0.5rem', position: 'fixed', left: 0 }} onClick={() => setStep(lastStep)}>
        Back
      </Button>
      <div
        style={{
          ...bg,
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
