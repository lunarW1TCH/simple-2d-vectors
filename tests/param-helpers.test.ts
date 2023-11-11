import { describe, expect, test } from 'bun:test';

import { Vector } from '../src';
import { getParamComponents, getParamsComponents } from '../src/param-helpers';

describe('extracts from', () => {
  test('vector', () => {
    const { x, y } = getParamComponents(new Vector([1, 2]));
    expect(x).toBe(1);
    expect(y).toBe(2);
  });

  test('arrayPoint', () => {
    const { x, y } = getParamComponents([1, 2]);
    expect(x).toBe(1);
    expect(y).toBe(2);
  });

  test('point', () => {
    const { x, y } = getParamComponents({ x: 1, y: 2 });
    expect(x).toBe(1);
    expect(y).toBe(2);
  });

  test('vectors', () => {
    const { x1, y1, x2, y2 } = getParamsComponents(
      new Vector([1, 2]),
      new Vector([3, 4])
    );
    expect(x1).toBe(1);
    expect(y1).toBe(2);
    expect(x2).toBe(3);
    expect(y2).toBe(4);
  });

  test('arrayPoints', () => {
    const { x1, y1, x2, y2 } = getParamsComponents([1, 2], [3, 4]);
    expect(x1).toBe(1);
    expect(y1).toBe(2);
    expect(x2).toBe(3);
    expect(y2).toBe(4);
  });

  test('points', () => {
    const { x1, y1, x2, y2 } = getParamsComponents(
      { x: 1, y: 2 },
      { x: 3, y: 4 }
    );
    expect(x1).toBe(1);
    expect(y1).toBe(2);
    expect(x2).toBe(3);
    expect(y2).toBe(4);
  });
});

test('throw error', () => {
  const throwError = () => {
    //@ts-ignore
    getParamComponents([1]);
  };
  expect(throwError).toThrow();
});
