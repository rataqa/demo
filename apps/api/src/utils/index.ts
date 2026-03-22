import { randomInt } from 'node:crypto';
import { readFileSync } from 'node:fs';

export function makeRandomLatLon() {
  const lat = randomFloat(180, -180);
  const lon = randomFloat(90, -90);
  return { lat, lon };
}

export function randomFloat(max = 100, min = -100) {
  const range = randomInt((max - min) * 1000) / 1000;
  return min + range;
}

/**
 * avoiding require('file.json') to reduce memory usage
 */
export function requireJsonFile<TOut = any>(file: string): TOut {
  const text = readFileSync(file, 'utf-8');
  return JSON.parse(text) as TOut;
}
