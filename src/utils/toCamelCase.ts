export const toCamelCase = (string: string) => {
  return string.replace(/_./g, str => str[1].toUpperCase());
};
