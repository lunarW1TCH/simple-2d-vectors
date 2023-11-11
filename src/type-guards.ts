import { ArrayPoint, Point, PointLike } from './types';

export const isPoint = (param: PointLike): param is Point => {
  return 'x' in param && 'y' in param;
};

export const isArrayPoint = (param: PointLike): param is ArrayPoint => {
  return (
    Array.isArray(param) &&
    typeof param[0] === 'number' &&
    typeof param[1] === 'number'
  );
};
