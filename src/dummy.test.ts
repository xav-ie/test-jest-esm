import { add } from './dummy.js';
import { multiply } from './dummy.js';

describe('Dummy', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});
