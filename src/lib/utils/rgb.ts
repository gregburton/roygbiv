import * as c from "colors-convert";
import { RgbConversions } from "@/types/conversions";
import stripInputToNumberArray from "./strip-input-to-numbers";

export default function getRgbConversions(rgb: string): RgbConversions {
  if (!rgb) return undefined;

  let adjustedRgb = rgb;

  // getRgbObjFromString will throw an error if `c.isRgb(rgb) === false`, so no need to check for it in this block.
  const validRgbObj = getRgbObjFromString(rgb);
  const rgbArray = Object.values(validRgbObj);

  adjustedRgb = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;

  // convert color to rgb value
  // eg: rgb === "blue" -> c.colorToRgb("blue") -> "rgb(100%, 100%, 0%, 0%)"
  // This won't work alongside the current validation approach.
  const colorToRgb = "";
  // if (c.isColor(rgb)) {
  //   colorToRgb = c.colorToRgb(rgb);
  // }

  return {
    toCMYK: c.rgbToCmyk(validRgbObj),
    toRGBA: {
      ...c.rgbToRgba(validRgbObj),
      a: parseFloat(c.rgbToRgba(validRgbObj).a.toFixed(2)),
    },
    toHEX: c.rgbToHex(validRgbObj),
    toHSL: c.rgbToHsl(validRgbObj),
    toHSLA: {
      ...c.rgbToHsla(validRgbObj),
      a: parseFloat(c.rgbToHsla(validRgbObj).a.toFixed(2)),
    },
    adjustedRgb,
    colorToRgb,
  };
}

export const isStringRgb = (rgb: string) => {
  const rgbNums = stripInputToNumberArray(rgb);

  const rgbObj = {
    r: rgbNums[0],
    g: rgbNums[1],
    b: rgbNums[2],
  };

  if (!c.isRgb(rgbObj)) {
    return false;
  }

  return true;
};

/**
 * **********************
 * MARKED FOR DELETION ↓
 * **********************
 */
export const getRgbObjFromString = (rgb: string) => {
  const rgbNums = stripInputToNumberArray(rgb);

  const rgbObj = {
    r: rgbNums[0],
    g: rgbNums[1],
    b: rgbNums[2],
  };

  if (!c.isRgb(rgbObj)) {
    throw new Error(`${rgb} is an invalid RGB value`);
  }

  // console.log(rgbNums);
  // console.log(rgbObj);

  return rgbObj;
};
