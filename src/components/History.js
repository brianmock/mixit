import cmykRgb from 'cmyk-rgb';
import { getColorByDate } from '../App';
import { calculateLogScore } from './Score';

export default function History() {
  const dates = Array.from({length: 365}, (x, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString();
  });

  return dates.map(date => {
    const { cyan, magenta, yellow, black } = getColorByDate(new Date(date).valueOf())

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
          height: '10vh',
          width: '100vw',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          textShadow: '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
          color: '#fff',
          fontSize: '8vh',
        }}>
        {score && `Easy: ${score} Hard: ${calculateLogScore(score)}`}
      </div>
    );
  });
}
