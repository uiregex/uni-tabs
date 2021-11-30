export const isDefined = (value: unknown): boolean => typeof value !== 'undefined'; // && value !== null;

export const isString = (value: unknown): value is string => typeof value === 'string';

export function isJSON(value: any): boolean {
  const optional = `(?:".+"[:].+)?`;
  const regexArray = new RegExp(`^[\\[].*[\\]]$`, 'g');
  const regexObject = new RegExp(`^[{]${optional}[}]$`, 'g');
  const regexArrayObject = new RegExp(`^[\\[][{]${optional}[}][\\]]$`, 'g');

  return isString(value) && (regexObject.test(value) || regexArray.test(value) || regexArrayObject.test(value));
}
