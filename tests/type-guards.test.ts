import { describe, expect, test } from 'bun:test';

import { Vector } from '../src';
import { isArrayPoint, isPoint } from '../src/type-guards';

describe('isPoint', () => {
  test('passes for vector', () => {
    expect(isPoint(new Vector([1, 2]))).toBeTrue();
  });

  test('passes for point', () => {
    expect(isPoint({ x: 1, y: 2 })).toBeTrue();
  });

  test('fails for arrayPoint', () => {
    expect(isPoint([1, 2])).toBeFalse();
  });
});

describe('isArrayPoint', () => {
  test('fails for vector', () => {
    expect(isArrayPoint(new Vector([1, 2]))).toBeFalse();
  });

  test('fails for point', () => {
    expect(isArrayPoint({ x: 1, y: 2 })).toBeFalse();
  });

  test('passes for arrayPoint', () => {
    expect(isArrayPoint([1, 2])).toBeTrue();
  });
});
