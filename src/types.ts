import Vector from './vector';

export type ArrayPoint = [number, number];

export type Point = {
  x: number;
  y: number;
};

export type PointLike = Vector | Point | ArrayPoint;
