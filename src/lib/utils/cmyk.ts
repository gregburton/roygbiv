import * as c from "colors-convert";
import { CmykConversions } from "@/types/conversions";
import stripInputToNumberArray from "./strip-input-to-numbers";

export default function getCmykConversions(cmyk: string): CmykConversions {
  if (!cmyk) return undefined;

  let adjustedCmyk = cmyk;

  // getCmykObjFromString will throw an error if `c.isCmyk(cmyk) === false`, so no need to check for it in this block.
  const validCmykObj = getCmykObjFromString(cmyk);
  const cmykArray = Object.values(validCmykObj);

  adjustedCmyk = "cmyk(" + cmykArray.splice(0, 4).join("%, ") + "%)";

  // convert color to cmyk value
  // eg: cmyk === "blue" -> c.colorToCmyk("blue") -> "cmyk(100%, 100%, 0%, 0%)"
  // This won't work alongside the current validation approach.
  const colorToCmyk = "";
  // if (c.isColor(cmyk)) {
  //   colorToCmyk = c.colorToCmyk(cmyk);
  // }

  return {
    toRGB: c.cmykToRgb(validCmykObj),
    toRGBA: {
      ...c.cmykToRgba(validCmykObj),
      a: parseFloat(c.cmykToRgba(validCmykObj).a.toFixed(2)),
    },
    toHEX: c.cmykToHex(validCmykObj),
    toHSL: c.cmykToHsl(validCmykObj),
    toHSLA: {
      ...c.cmykToHsla(validCmykObj),
      a: parseFloat(c.cmykToHsla(validCmykObj).a.toFixed(2)),
    },
    adjustedCmyk,
    colorToCmyk,
  };
}

/**
 * Disects the input and determines if it can be morphed
 * into a CMYK object that passes the `c.isCmyk(cmykObj)`
 * colors-convert test.
 *
 * This differs from the `getCmykObjFromString` because
 * it just returns a boolean instead of throwing an error.
 * It's ok if this one fails.
 *
 * @param string random user input
 * @returns boolean - `true` | `false`
 */
export const isStringCmyk = (string: string) => {
  const cmykNums = stripInputToNumberArray(string);

  const cmykObj = {
    c: cmykNums[0],
    m: cmykNums[1],
    y: cmykNums[2],
    k: cmykNums[3],
  };

  if (!c.isCmyk(cmykObj)) {
    return false;
  }

  return true;
};

/**
 * **********************
 * MARKED FOR DELETION ↓
 * **********************
 */
export const getCmykObjFromString = (cmyk: string) => {
  const cmykNums = stripInputToNumberArray(cmyk);

  const cmykObj = {
    c: cmykNums[0],
    m: cmykNums[1],
    y: cmykNums[2],
    k: cmykNums[3],
  };

  if (!c.isCmyk(cmykObj)) {
    throw new Error(`${cmyk} is an invalid CMYK value`);
  }

  // console.log(cmykNums);
  // console.log(cmykObj);

  return cmykObj;
};
