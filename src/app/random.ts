export function randomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArrayItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function randomPosition(): { x: number, y: number } {
  return { x: randomInt(0, 500), y: randomInt(0, 500) };
}

const generators = {
  position: () => randomPosition(),
  color: () => randomColor(),
  size: () => randomInt(16, 48),
};

export function randomUpdate() {
  const type = randomArrayItem(['position', 'color', 'size']);
  const value = generators[type]();
  return { type, value };
}
