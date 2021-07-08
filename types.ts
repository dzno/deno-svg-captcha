export interface TextOptions {
  overlap?: boolean;
  color?: string;
  randomColor?: boolean;
  fontSize?: number;
  randomFontSize?: { min: number; max: number };
  rotate?: number;
}
export interface CaptchaOptions {
  height?: number;
  width?: number;
  charactersNumber?: number;
  textOption?: TextOptions;
}
