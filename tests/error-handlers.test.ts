import { expect, test } from 'bun:test';

import {
  divisionErrorHandler,
  negativeLengthErrorHandler,
} from '../src/error-handlers';

test('division by zero', () => {
  const throwError = () => {
    divisionErrorHandler(0);
  };
  const doNotThrow = () => {
    divisionErrorHandler(1);
    divisionErrorHandler([1, -2]);
    divisionErrorHandler(-1);
  };
  expect(throwError).toThrow();
  expect(doNotThrow).not.toThrow();
});

test('negative magnitude', () => {
  const throwError = () => {
    negativeLengthErrorHandler(-1);
  };
  const doNotThrow = () => {
    negativeLengthErrorHandler(0);
    negativeLengthErrorHandler(1);
  };
  expect(throwError).toThrow();
  expect(doNotThrow).not.toThrow();
});
