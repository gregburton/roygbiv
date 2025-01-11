import * as c from "colors-convert";
import { HslConversions } from "@/types/conversions";
import stripInputToNumberArray from "./strip-input-to-numbers";

export default function getHslConversions(hsl: string): HslConversions {
  if (!hsl) return undefined;

  let adjustedHsl = hsl;

  // getHslObjFromString will throw an error if `c.isHsl(hsl) === false`, so no need to check for it in this block.
  const validHslObj = getHslObjFromString(hsl);
  const hslArray = Object.values(validHslObj);

  adjustedHsl = `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;

  // convert color to hsl value
  // eg: hsl === "blue" -> c.colorToHsl("blue") -> "hsl(100%, 100%, 0%, 0%)"
  // This won't work alongside the current validation approach.
  const colorToHsl = "";
  // if (c.isColor(hsl)) {
  //   colorToHsl = c.colorToHsl(hsl);
  // }

  return {
    toCMYK: c.hslToCmyk(validHslObj),
    toRGB: c.hslToRgb(validHslObj),
    toRGBA: {
      ...c.hslToRgba(validHslObj),
      a: parseFloat(c.hslToRgba(validHslObj).a.toFixed(2)),
    },
    toHEX: c.hslToHex(validHslObj),
    toHSLA: {
      ...c.hslToHsla(validHslObj),
      a: parseFloat(c.hslToHsla(validHslObj).a.toFixed(2)),
    },
    adjustedHsl,
    colorToHsl,
  };
}

export const isStringHsl = (hsl: string) => {
  const hslNums = stripInputToNumberArray(hsl);

  const hslObj = {
    h: hslNums[0],
    s: hslNums[1],
    l: hslNums[2],
  };

  if (!c.isHsl(hslObj)) {
    return false;
  }

  return true;
};

/**
 * **********************
 * MARKED FOR DELETION ↓
 * **********************
 */
export const getHslObjFromString = (hsl: string) => {
  const hslNums = stripInputToNumberArray(hsl);

  const hslObj = {
    h: hslNums[0],
    s: hslNums[1],
    l: hslNums[2],
  };

  if (!c.isHsl(hslObj)) {
    throw new Error(`${hsl} is an invalid HSL value`);
  }

  // console.log(hslNums);
  // console.log(hslObj);

  return hslObj;
};
