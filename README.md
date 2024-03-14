# simple-2d-vectors

A lightweight TypeScript library for creating and manipulating 2d vectors. I created it because all vector libraries out there were either too old, depending on browser API or too heavy.

[npm](https://www.npmjs.com/package/simple-2d-vectors)
[github](https://github.com/lunarW1TCH/simple-2d-vectors)
[jsr](https://jsr.io/@lunarweb/simple-2d-vectors@1.0.6)

### Quick start

```typescript
import { Vector } from 'simple-2d-vectors';

const vector = new Vector([3, 4]);
```

### Parameters

Most methods require you to pass a PointLike datatype, which is a union between a Vector, a Point and an ArrayPoint:

```typescript
type PointLike = Vector | Point | ArrayPoint;
```

```typescript
type Point = {
  x: number;
  y: number;
};
```

```typescript
type ArrayPoint = [number, number];
```

```typescript
class Vector implements Point {
  // ...
}
```

No matter which type you choose, the result will be the same.

```typescript
const v1 = new Vector([3, 4]);
const v2 = new Vector({ x: 3, y: 4 });
const v3 = new Vector(v1);
```

### Methods

Methods called on a vector object modify it in-place. To avoid changing the original object you can either first copy the vector or use the static version of a method (most methods have both static and non-static versions).

```typescript
const vec = new Vector([3, 4]);

const copy1 = vec.copy();
const copy2 = new Vector(vec);

copy1.add([1, 2]); // `vec` isn't affected by this operation
copy2.add([1, 2]); // neither by this one

const newVector = Vector.add([3, 4], [1, 2]); // returns a new vector
```

| Method            | Non-static | Static | Non-static params  | Static params                          | Returns      | Description                                                                                                              |
| ----------------- | ---------- | ------ | ------------------ | -------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| copy()            | ✅         | ❌     | ❌                 | ❌                                     | `Vector`     | Returns a copy of a vector.                                                                                              |
| add()             | ✅         | ✅     | `param: Pointlike` | `paramA: PointLike, paramB: PointLike` | `Vector`     | Sums individually x and y components.                                                                                    |
| subtract()        | ✅         | ✅     | `param: Pointlike` | `paramA: PointLike, paramB: PointLike` | `Vector`     | Subtracts x and y components from each other.                                                                            |
| multiply()        | ✅         | ✅     | `param: Pointlike` | `paramA: PointLike, paramB: PointLike` | `Vector`     | Multiplies x and y components.                                                                                           |
| divide()          | ✅         | ✅     | `param: Pointlike` | `paramA: PointLike, paramB: PointLike` | `Vector`     | Divides x and y components.                                                                                              |
| invertX()         | ✅         | ❌     | ❌                 | ❌                                     | `Vector`     | Inverts x component of a vector.                                                                                         |
| invertY()         | ✅         | ❌     | ❌                 | ❌                                     | `Vector`     | Inverts y component of a vector.                                                                                         |
| invert()          | ✅         | ❌     | ❌                 | ❌                                     | `Vector`     | Inverts both components of a vector.                                                                                     |
| magnitude()       | ✅         | ✅     | ❌                 | `param: Pointlike`                     | `number`     | Returns magnitude/length of the vector.                                                                                  |
| setMagnitude()    | ✅         | ✅     | `newMag: number`   | `param: Pointlike, newMag: number`     | `Vector`     | Sets the magnitude/length of the vector to the provided value (>= 0) while keeping its direction.                        |
| normalize()       | ✅         | ✅     | ❌                 | `param: Pointlike`                     | `Vector`     | Sets length/magnitude of a vector to 1 while keeping its direction.                                                      |
| rotateBy()        | ✅         | ✅     | `radians: number`  | `param: Pointlike, radians: number`    | `Vector`     | Rotates the vector by the provided value (in radians).                                                                   |
| rotateByDeg()     | ✅         | ✅     | `degrees: number`  | `param: Pointlike, degrees: number`    | `Vector`     | Rotates the vector by the provided value (in degrees).                                                                   |
| rotateTo()        | ✅         | ✅     | `radians: number`  | `param: Pointlike, radians: number`    | `Vector`     | Rotates vector to a provided angle (in radians), counting from the positive X axis, while keeping its magnitude.         |
| rotateToDeg()     | ✅         | ✅     | `degrees: number`  | `param: Pointlike, degrees: number`    | `Vector`     | Rotates vector to a provided angle (in degrees), counting from the positive X axis, while keeping its magnitude.         |
| dotProduct()      | ✅         | ✅     | `param: PointLike` | `paramA: Pointlike, paramB: PointLike` | `number`     | Returns a dot products of two vectors.                                                                                   |
| angle()           | ✅         | ✅     | ❌                 | `param: PointLike`                     | `number`     | Returns the angle (in radians) between any Vector(x, 0) and the original vector, where x is positive.                    |
| angleDeg()        | ✅         | ✅     | ❌                 | `param: PointLike`                     | `number`     | Returns the angle (in degrees) between any Vector(x, 0) and the original vector, where x is positive.                    |
| angleBetween()    | ✅         | ✅     | `param: PointLike` | `paramA: Pointlike, paramB: PointLike` | `number`     | Returns the angle (in radians) between original vector and provided vector.                                              |
| angleBetweenDeg() | ✅         | ✅     | `param: PointLike` | `paramA: Pointlike, paramB: PointLike` | `number`     | Returns the angle (in degrees) between original vector and provided vector.                                              |
| toString()        | ✅         | ❌     | ❌                 | ❌                                     | `string`     | Returns a string representation of a vector `'(x, y)'`.                                                                  |
| toPoint()         | ✅         | ❌     | ❌                 | ❌                                     | `Point`      | Returns x and y components as a Point.                                                                                   |
| toArray()         | ✅         | ❌     | ❌                 | ❌                                     | `ArrayPoint` | Returns x and y components as an ArrayPoint.                                                                             |
| fromPoints()      | ❌         | ✅     | ❌                 | `paramA: Pointlike, paramB: PointLike` | `Vector`     | Returns a vector which is a path between two provided points.                                                            |
| fromAngle()       | ❌         | ✅     | ❌                 | `radians: number, length?: number`     | `Vector`     | Returns a vector with a provided angle (in radians) counting from positive X axis. Length is optional and defaults to 1. |

### Properties

| Property | Type   | Description             |
| -------- | ------ | ----------------------- |
| x        | number | x component of a Vector |
| y        | number | y component of a Vector |
