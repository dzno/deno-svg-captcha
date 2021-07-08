export const randomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
export const randomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
