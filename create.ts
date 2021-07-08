import { uniqueString } from "./deps.ts";
import { randomHexColor, randomNumber } from "./utilities.ts";
import { CaptchaOptions } from "./types.ts";

export function makeCaptcha(captchaOptions?: CaptchaOptions) {
  const svgHeight = captchaOptions?.height || 120;
  const svgWidth = captchaOptions?.width || 300;
  const numberOfCharacters = captchaOptions?.charactersNumber || 5;
  let svgContext =
    `<svg xmlns="http://www.w3.org/2000/svg" fill='' width="${svgWidth}" height="${svgHeight}" viewBox="0,0,${svgWidth},${svgHeight}">`;
  const text = uniqueString(numberOfCharacters);
  let textElementXPosition = 0,
    textElementYPosition = svgHeight / 2,
    textColor = "";
  for (let character = 0; character < numberOfCharacters; character++) {
    let fontSize = captchaOptions?.textOption?.randomFontSize
      ? randomNumber(
        captchaOptions.textOption.randomFontSize.min,
        captchaOptions.textOption.randomFontSize.max,
      )
      : (captchaOptions?.textOption?.fontSize || 4);
    textColor = captchaOptions?.textOption?.randomColor
      ? randomHexColor()
      : (captchaOptions?.textOption?.color
        ? captchaOptions.textOption?.color
        : "#000");
    let textRotate = captchaOptions?.textOption?.rotate
      ? randomNumber(
        -captchaOptions.textOption.rotate,
        captchaOptions.textOption.rotate,
      )
      : 0;
    svgContext +=
      `<text fill="${textColor}" x="${textElementXPosition}" y="${textElementYPosition}" font-size="${fontSize}rem" rotate="${textRotate}">${
        text[character]
      }</text>`;
    textElementXPosition += captchaOptions?.textOption?.overlap
      ? randomNumber(
        (2 / svgWidth / numberOfCharacters),
        svgWidth / numberOfCharacters,
      )
      : svgWidth / numberOfCharacters;
    textElementYPosition = svgHeight / 2;
  }
  svgContext += `</svg>`;
  return {
    text,
    svgContext,
  };
}
