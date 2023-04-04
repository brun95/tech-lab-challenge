import { jumpingOnTheClouds, validateJotcInput } from "../../src/services/jotcService";

describe('jumpingOnTheClouds', () => {
  it('should return the correct number of jumps for the input [0, 0, 0, 0]', () => {
    expect(jumpingOnTheClouds([0, 0, 0, 0]).jumps).toBe(2);
  });

  it('should return the correct number of jumps for the input [0, 0, 1, 0, 0, 1, 0]', () => {
    expect(jumpingOnTheClouds([0, 0, 1, 0, 0, 1, 0]).jumps).toBe(4);
  });

  it('should return the correct number of jumps for the input [0, 0, 0, 0, 1, 0]', () => {
    expect(jumpingOnTheClouds([0, 0, 0, 0, 1, 0]).jumps).toBe(3);
  });
});

describe('validateJotcInput', () => {
  it('should return an empty array for a valid input', () => {
    const input = [0, 1, 0, 0, 1, 0];
    const errors = validateJotcInput(input);
    expect(errors).toEqual([]);
  });

  it('should return an error message if the input has less than 2 elements', () => {
    const input = [0];
    const errors = validateJotcInput(input);
    expect(errors).toContain('The number of elements must be between 2 and 100.');
  });

  it('should return an error message if the input has more than 100 elements', () => {
    const input = new Array(101).fill(0);
    const errors = validateJotcInput(input);
    expect(errors).toContain('The number of elements must be between 2 and 100.');
  });

  it('should return an error message if the first element is not 0', () => {
    const input = [1, 0, 0, 1, 0];
    const errors = validateJotcInput(input);
    expect(errors).toContain('The first element must be 0.');
  });

  it('should return an error message if the last element is not 0', () => {
    const input = [0, 1, 0, 0, 1];
    const errors = validateJotcInput(input);
    expect(errors).toContain('The last element must be 0.');
  });

  it('should return an error message if any element is not 0 or 1', () => {
    const input = [0, 1, 2, 0, 1, 0];
    const errors = validateJotcInput(input);
    expect(errors).toContain('All elements must be 0 or 1.');
  });
});

