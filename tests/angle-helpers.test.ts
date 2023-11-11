import { expect, test } from 'bun:test';

import { degreesToRadians, radiansToDegrees } from '../src/angle-helpers';

test('convert degrees', () => {
  expect(degreesToRadians(180)).toBe(Math.PI);
});

test('convert radians', () => {
  expect(radiansToDegrees(Math.PI)).toBe(180);
});
