import { beforeEach, describe, expect, test } from 'bun:test';

import { Vector } from '../src';
import { isPoint } from '../src/type-guards';

let vec: Vector;

beforeEach(() => {
  vec = new Vector([3, 4]);
});

describe('creation', () => {
  test('constructor', () => {
    expect(isPoint(vec)).toBeTrue();
    expect(vec.x).toBe(3);
    expect(vec.y).toBe(4);
  });

  test('copy', () => {
    const copy = vec.copy().add([1, 1]);
    expect(isPoint(copy)).toBeTrue();
    expect(copy.x).toBe(4);
    expect(copy.y).toBe(5);

    expect(vec.x).toBe(3);
    expect(vec.y).toBe(4);
  });

  test('fromAngle', () => {
    const fromAngle = Vector.fromAngle(Math.PI / 2, 5);
    expect(isPoint(fromAngle)).toBeTrue();
    expect(fromAngle.x).toBeCloseTo(0, 5);
    expect(fromAngle.y).toBeCloseTo(5, 5);
  });

  test('fromPoints', () => {
    const fromPoints = Vector.fromPoints([0, 0], [3, 4]);
    expect(isPoint(fromPoints)).toBeTrue();
    expect(fromPoints.x).toBe(3);
    expect(fromPoints.y).toBe(4);
  });
});

describe('products', () => {
  test('angle', () => {
    expect(new Vector([1, 1]).angle()).toBeCloseTo(Math.PI / 4, 5);
  });

  test('angleDeg', () => {
    expect(new Vector([1, 1]).angleDeg()).toBeCloseTo(45, 5);
  });

  test('angleBetween', () => {
    expect(new Vector([1, 1]).angleBetween(new Vector([0, 1]))).toBeCloseTo(
      Math.PI / 4,
      5
    );
  });

  test('angleBetweenDeg', () => {
    expect(new Vector([1, 1]).angleBetweenDeg(new Vector([0, 1]))).toBeCloseTo(
      45,
      5
    );
  });

  test('magnitude', () => {
    expect(vec.magnitude()).toBe(5);
  });

  test('dotProduct', () => {
    expect(vec.dotProduct(new Vector([1, 1]))).toBe(7);
  });

  test('toString', () => {
    expect(vec.toString()).toBe('(3, 4)');
  });

  test('toArray', () => {
    expect(vec.toArray()).toEqual([3, 4]);
  });

  test('toPoint', () => {
    expect(vec.toPoint()).toEqual({ x: 3, y: 4 });
  });
});

describe('arithmetics', () => {
  test('add', () => {
    const v = vec.copy().add([2, 3]);
    expect(v.x).toBe(5);
    expect(v.y).toBe(7);
  });

  test('subtract', () => {
    const v = vec.copy().subtract([2, 3]);
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);
  });

  test('multiply', () => {
    const v = vec.copy().multiply([2, 3]);
    expect(v.x).toBe(6);
    expect(v.y).toBe(12);
  });

  test('divide', () => {
    const v = vec.copy().divide([3, 2]);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);

    const throwError = () => {
      vec.copy().divide([1, 0]);
    };
    expect(throwError).toThrow();
  });

  test('invertX', () => {
    vec.invertX();
    expect(vec.x).toBe(-3);
    expect(vec.y).toBe(4);
  });

  test('invertY', () => {
    vec.invertY();
    expect(vec.x).toBe(3);
    expect(vec.y).toBe(-4);
  });

  test('invert', () => {
    vec.invert();
    expect(vec.x).toBe(-3);
    expect(vec.y).toBe(-4);
  });

  test('normalize', () => {
    const v = vec.copy().normalize();
    expect(v.magnitude()).toBe(1);
    expect(v.angle()).toBe(vec.angle());
  });

  test('setMagnitude', () => {
    const v = vec.copy().setMagnitude(25);
    expect(v.angle()).toBe(vec.angle());

    expect(v.x).toBe(15);
    expect(v.y).toBe(20);
  });

  test('rotateBy', () => {
    vec.rotateBy(Math.PI);
    expect(vec.x).toBeCloseTo(-3, 5);
    expect(vec.y).toBeCloseTo(-4, 5);
  });

  test('rotateByDeg', () => {
    vec.rotateByDeg(180);
    expect(vec.x).toBeCloseTo(-3, 5);
    expect(vec.y).toBeCloseTo(-4, 5);
  });

  test('rotateTo', () => {
    vec.rotateTo(Math.PI / 2);
    expect(vec.x).toBeCloseTo(0, 5);
    expect(vec.y).toBeCloseTo(5, 5);
  });

  test('rotateToDeg', () => {
    vec.rotateToDeg(90);
    expect(vec.x).toBeCloseTo(0, 5);
    expect(vec.y).toBeCloseTo(5, 5);
  });
});

describe('static', () => {
  describe('products', () => {
    test('angle', () => {
      expect(Vector.angle([1, 1])).toBeCloseTo(Math.PI / 4, 5);
    });

    test('angleDeg', () => {
      expect(Vector.angleDeg([1, 1])).toBeCloseTo(45, 5);
    });

    test('angleBetween', () => {
      expect(Vector.angleBetween([1, 1], [0, 1])).toBeCloseTo(Math.PI / 4, 5);
    });

    test('angleBetweenDeg', () => {
      expect(Vector.angleBetweenDeg([1, 1], [0, 1])).toBeCloseTo(45, 5);
    });

    test('magnitude', () => {
      expect(Vector.magnitude([3, 4])).toBe(5);
    });

    test('dotProduct', () => {
      expect(Vector.dotProduct([3, 4], [1, 1])).toBe(7);
    });
  });

  describe('arithmetics', () => {
    test('add', () => {
      const v = Vector.add([2, 4], [2, 2]);
      expect(v.x).toBe(4);
      expect(v.y).toBe(6);
    });

    test('subtract', () => {
      const v = Vector.subtract([2, 4], [2, 2]);
      expect(v.x).toBe(0);
      expect(v.y).toBe(2);
    });

    test('multiply', () => {
      const v = Vector.multiply([2, 4], [2, 2]);
      expect(v.x).toBe(4);
      expect(v.y).toBe(8);
    });

    test('divide', () => {
      const v = Vector.divide([2, 4], [2, 2]);
      expect(v.x).toBe(1);
      expect(v.y).toBe(2);

      const throwError = () => {
        Vector.divide([1, 1], [1, 0]);
      };
      const doNotThrow = () => {
        Vector.divide([0, 0], [1, 1]);
      };

      expect(throwError).toThrow();
      expect(doNotThrow).not.toThrow();
    });

    test('setMagnitude', () => {
      const v = Vector.setMagnitude(vec, 25);
      expect(v.angle()).toBe(vec.angle());

      expect(v.x).toBe(15);
      expect(v.y).toBe(20);
    });

    test('rotateBy', () => {
      const v = Vector.rotateBy(vec, Math.PI);
      expect(v.x).toBeCloseTo(-3, 5);
      expect(v.y).toBeCloseTo(-4, 5);
    });

    test('rotateByDeg', () => {
      const v = Vector.rotateByDeg(vec, 180);
      expect(v.x).toBeCloseTo(-3, 5);
      expect(v.y).toBeCloseTo(-4, 5);
    });

    test('rotateTo', () => {
      const v = Vector.rotateTo(vec, Math.PI / 2);
      expect(v.x).toBeCloseTo(0, 5);
      expect(v.y).toBeCloseTo(5, 5);
    });

    test('rotateToDeg', () => {
      const v = Vector.rotateToDeg(vec, 90);
      expect(v.x).toBeCloseTo(0, 5);
      expect(v.y).toBeCloseTo(5, 5);
    });
  });
});
