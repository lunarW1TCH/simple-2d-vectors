import { degreesToRadians, radiansToDegrees } from './angle-helpers';
import {
  divisionErrorHandler,
  negativeLengthErrorHandler,
} from './error-handlers';
import { getParamComponents, getParamsComponents } from './param-helpers';
import { ArrayPoint, Point, PointLike } from './types';

/**
 * 2d vector.
 */
class Vector implements Point {
  x: number;
  y: number;

  constructor(param: PointLike) {
    const { x, y } = getParamComponents(param);
    this.x = x;
    this.y = y;
  }

  copy(): Vector {
    return new Vector(this);
  }

  add(param: PointLike): Vector {
    const { x, y } = getParamComponents(param);
    this.x += x;
    this.y += y;
    return this;
  }

  subtract(param: PointLike): Vector {
    const { x, y } = getParamComponents(param);
    this.x -= x;
    this.y -= y;
    return this;
  }

  multiply(param: PointLike): Vector {
    const { x, y } = getParamComponents(param);
    this.x *= x;
    this.y *= y;
    return this;
  }

  divide(param: PointLike): Vector {
    const { x, y } = getParamComponents(param);
    divisionErrorHandler([x, y]);
    this.x /= x;
    this.y /= y;
    return this;
  }

  invertX(): Vector {
    this.x = -this.x;
    return this;
  }

  invertY(): Vector {
    this.y = -this.y;
    return this;
  }

  invert(): Vector {
    this.invertX();
    this.invertY();
    return this;
  }

  /**
   * Returns magnitude/length of the vector.
   */
  magnitude(): number {
    return Vector.magnitude(this);
  }

  /**
   * Sets the magnitude/length of the vector to the provided value (>= 0) while keeping its direction.
   */
  setMagnitude(newMag: number): Vector {
    negativeLengthErrorHandler(newMag);
    this.normalize().multiply([newMag, newMag]);
    return this;
  }

  /**
   * Sets length/magnitude of a vector to 1 while keeping its direction.
   */
  normalize(): Vector {
    this.divide([this.magnitude(), this.magnitude()]);
    return this;
  }

  /**
   * Rotates the vector by the provided value (in radians).
   */
  rotateBy(radians: number): Vector {
    const newVector = Vector.rotateBy(this, radians);
    this.x = newVector.x;
    this.y = newVector.y;
    return this;
  }

  /**
   * Rotates the vector by the provided value (in degrees).
   */
  rotateByDeg(degrees: number): Vector {
    this.rotateBy(degreesToRadians(degrees));
    return this;
  }

  /**
   * Rotates vector to a provided angle (in radians), counting from the positive X axis, while keeping its magnitude.
   */
  rotateTo(radians: number): Vector {
    const rotatedVector = Vector.rotateTo(this, radians);
    this.x = rotatedVector.x;
    this.y = rotatedVector.y;
    return this;
  }

  /**
   * Rotates vector to a provided angle (in degrees), counting from the positive X axis, while keeping its magnitude.
   */
  rotateToDeg(degrees: number): Vector {
    this.rotateTo(degreesToRadians(degrees));
    return this;
  }

  /**
   * @link https://en.wikipedia.org/wiki/Dot_product
   */
  dotProduct(param: PointLike): number {
    const { x, y } = getParamComponents(param);
    return Vector.dotProduct(this, new Vector([x, y]));
  }

  /**
   * Returns the angle (in radians) between original vector and provided vector.
   */
  angleBetween(param: PointLike): number {
    const { x, y } = getParamComponents(param);
    return Vector.angleBetween(this, new Vector([x, y]));
  }

  /**
   * Returns the angle (in degrees) between original vector and provided vector.
   */
  angleBetweenDeg(param: PointLike): number {
    const { x, y } = getParamComponents(param);
    return Vector.angleBetweenDeg(this, new Vector([x, y]));
  }

  angle(): number {
    return this.angleBetween(new Vector([1, 0]));
  }

  angleDeg(): number {
    return this.angleBetweenDeg(new Vector([1, 0]));
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  toArray(): ArrayPoint {
    return [this.x, this.y];
  }

  toPoint(): Point {
    return { x: this.x, y: this.y };
  }

  /**
   * Returns magnitude/length of the vector.
   */
  static magnitude(param: PointLike): number {
    const { x, y } = getParamComponents(param);
    return Math.sqrt(x ** 2 + y ** 2);
  }

  /**
   * Sets the magnitude/length of the vector to the provided value (>= 0) while keeping its direction.
   */
  static setMagnitude(param: PointLike, newMag: number): Vector {
    negativeLengthErrorHandler(newMag);
    const { x, y } = getParamComponents(param);
    return Vector.normalize(new Vector([x, y])).multiply([newMag, newMag]);
  }

  /**
   * Sets length/magnitude of a vector to 1 while keeping its direction.
   */
  static normalize(param: PointLike): Vector {
    const { x, y } = getParamComponents(param);
    const mag = Vector.magnitude([x, y]);
    return Vector.divide(new Vector([x, y]), new Vector([mag, mag]));
  }

  static add(paramA: PointLike, paramB: PointLike): Vector {
    const { x1, y1, x2, y2 } = getParamsComponents(paramA, paramB);
    return new Vector([x1 + x2, y1 + y2]);
  }

  static subtract(paramA: PointLike, paramB: PointLike): Vector {
    const { x1, y1, x2, y2 } = getParamsComponents(paramA, paramB);
    return new Vector([x1 - x2, y1 - y2]);
  }

  static multiply(paramA: PointLike, paramB: PointLike): Vector {
    const { x1, y1, x2, y2 } = getParamsComponents(paramA, paramB);
    return new Vector([x1 * x2, y1 * y2]);
  }

  static divide(paramA: PointLike, paramB: PointLike): Vector {
    const { x1, y1, x2, y2 } = getParamsComponents(paramA, paramB);
    divisionErrorHandler([x2, y2]);
    return new Vector([x1 / x2, y1 / y2]);
  }

  /**
   * @link https://en.wikipedia.org/wiki/Dot_product
   */
  static dotProduct(paramA: PointLike, paramB: PointLike): number {
    const { x1, y1, x2, y2 } = getParamsComponents(paramA, paramB);
    return x1 * x2 + y1 * y2;
  }

  /**
   * Returns the angle (in radians) between the first and second vector.
   */
  static angleBetween(paramA: PointLike, paramB: PointLike): number {
    const dotProduct = Vector.dotProduct(paramA, paramB);
    const magA = Vector.magnitude(paramA);
    const magB = Vector.magnitude(paramB);

    const cosTheta = dotProduct / magA / magB;
    return Math.acos(cosTheta);
  }

  /**
   * Returns the angle (in degrees) between the first and second vector.
   */
  static angleBetweenDeg(paramA: PointLike, paramB: PointLike): number {
    return radiansToDegrees(Vector.angleBetween(paramA, paramB));
  }

  /**
   * Returns the angle (in radians) between any Vector(x, 0) and the original vector, where x is positive.
   */
  static angle(param: PointLike): number {
    return Vector.angleBetween(new Vector([1, 0]), param);
  }

  /**
   * Returns the angle (in degrees) between any Vector(x, 0) and the original vector, where x is positive.
   */
  static angleDeg(param: PointLike): number {
    return Vector.angleBetweenDeg(new Vector([1, 0]), param);
  }

  /**
   * Rotates the vector by the provided value (in radians).
   */
  static rotateBy(param: PointLike, radians: number): Vector {
    const { x, y } = getParamComponents(param);

    const newX = Math.cos(radians) * x - Math.sin(radians) * y;
    const newY = Math.sin(radians) * x + Math.cos(radians) * y;

    return new Vector([newX, newY]);
  }

  /**
   * Rotates the vector by the provided value (in degrees).
   */
  static rotateByDeg(param: PointLike, degrees: number): Vector {
    return Vector.rotateBy(param, degreesToRadians(degrees));
  }

  /**
   * Rotates vector to a provided angle (in radians), counting from the positive X axis, while keeping its magnitude.
   */
  static rotateTo(param: PointLike, radians: number): Vector {
    return Vector.fromAngle(radians, Vector.magnitude(param));
  }

  /**
   * Rotates vector to a provided angle (in degrees), counting from the positive X axis, while keeping its magnitude.
   */
  static rotateToDeg(param: PointLike, degrees: number): Vector {
    return Vector.rotateTo(param, degreesToRadians(degrees));
  }

  /**
   * Returns a vector which is a path between two provided points.
   */
  static fromPoints(paramA: PointLike, paramB: PointLike): Vector {
    const { x1, y1, x2, y2 } = getParamsComponents(paramA, paramB);

    return new Vector([x2 - x1, y2 - y1]);
  }

  /**
   * Returns a vector with a provided angle (in radians) counting from positive X axis. Length is optional and defaults to 1.
   */
  static fromAngle(radians: number, length = 1): Vector {
    negativeLengthErrorHandler(length);
    const vector = new Vector([length, 0]);
    vector.rotateBy(radians);
    return vector;
  }
}

export default Vector;
