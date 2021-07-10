import { textHash } from "./utilities.ts";
export const isValid = (text: string, cpatchaCookie: string) => {
  return textHash(text) === cpatchaCookie;
};
