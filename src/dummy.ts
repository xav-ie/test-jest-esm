/** add two numbers */
export const add = (a: number, b: number) => a + b;

/** multiply implemented using add */
export const multiply = (a: number, b: number) => {
  let result = 0;
  for (let i = 0; i < b; i++) {
    result = add(result, a);
  }
  return result;
};
