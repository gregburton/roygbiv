import * as c from "colors-convert";
import { HslaConversions } from "@/types/conversions";
import stripInputToNumberArray from "./strip-input-to-numbers";

export default function getHslaConversions(hsla: string): HslaConversions {
  if (!hsla) return undefined;

  let adjustedHsla = hsla;

  // getHslaObjFromString will throw an error if `c.isHsla(hsla) === false`, so no need to check for it in this block.
  const validHslaObj = getHslaObjFromString(hsla);
  const hslaArray = Object.values(validHslaObj);

  adjustedHsla = `hsla(${hslaArray[0]}, ${hslaArray[1]}%, ${hslaArray[2]}%, ${hslaArray[3]})`;

  // convert color to hsla value
  // eg: hsla === "blue" -> c.colorToHsla("blue") -> "hsla(100%, 100%, 0%, 0%)"
  // This won't work alongside the current validation approach.
  const colorToHsla = "";
  // if (c.isColor(hsla)) {
  //   colorToHsla = c.colorToHsla(hsla);
  // }

  return {
    toCMYK: c.hslaToCmyk(validHslaObj),
    toRGB: c.hslaToRgb(validHslaObj),
    toRGBA: {
      ...c.hslaToRgba(validHslaObj),
      a: parseFloat(c.hslaToRgba(validHslaObj).a.toFixed(2)),
    },
    toHEX: c.hslaToHex(validHslaObj),
    toHSL: c.hslaToHsl(validHslaObj),
    adjustedHsla,
    colorToHsla,
  };
}

export const isStringHsla = (hsla: string) => {
  const hslaNums = stripInputToNumberArray(hsla);

  const hslaObj = {
    h: hslaNums[0],
    s: hslaNums[1],
    l: hslaNums[2],
    a: hslaNums[3],
  };

  if (!c.isHsla(hslaObj)) {
    return false;
  }

  return true;
};

/**
 * **********************
 * MARKED FOR DELETION ↓
 * **********************
 */
export const getHslaObjFromString = (hsla: string) => {
  const hslaNums = stripInputToNumberArray(hsla);

  const hslaObj = {
    h: hslaNums[0],
    s: hslaNums[1],
    l: hslaNums[2],
    a: parseFloat(hslaNums[3].toFixed(2)),
  };

  if (!c.isHsla(hslaObj)) {
    throw new Error(`${hsla} is an invalid HSLA value`);
  }

  //   console.log(hslaNums);
  //   console.log(hslaObj);

  return hslaObj;
};
