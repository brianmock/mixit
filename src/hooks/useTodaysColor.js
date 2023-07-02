export function useTodaysColor() {
  const date = new Date(new Date().toLocaleDateString()).valueOf();

  return useColorByDate(date);
}

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

function useColorByDate(date) {
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
