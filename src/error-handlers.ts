export const UNSUPPORTED_PARAMETERS =
  'Unsupported parameters, please provide a PointLike value.';

export const negativeLengthErrorHandler = (length: number): void => {
  if (length < 0) throw new Error('Length/magnitude cannot be negative.');
};

export const divisionErrorHandler = (value: number | number[]): void => {
  if (Array.isArray(value)) {
    value.forEach(v => {
      if (v === 0) throw new Error('Cannot divide by 0.');
    });
  } else {
    if (value === 0) throw new Error('Cannot divide by 0.');
  }
};
