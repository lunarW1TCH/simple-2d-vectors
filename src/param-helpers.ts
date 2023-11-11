import { UNSUPPORTED_PARAMETERS } from './error-handlers';
import { isArrayPoint, isPoint } from './type-guards';
import { PointLike } from './types';

export const getParamComponents = (param: PointLike) => {
  let x, y: number;
  if (isPoint(param)) {
    x = param.x;
    y = param.y;
  } else if (isArrayPoint(param)) {
    x = param[0];
    y = param[1];
  } else {
    throw new Error(UNSUPPORTED_PARAMETERS);
  }

  return { x, y };
};

export const getParamsComponents = (param1: PointLike, param2: PointLike) => {
  const param1Components = getParamComponents(param1);
  const param2Components = getParamComponents(param2);

  return {
    x1: param1Components.x,
    y1: param1Components.y,
    x2: param2Components.x,
    y2: param2Components.y,
  };
};
