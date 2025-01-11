import * as c from "colors-convert";
import { HexConversions } from "@/types/conversions";

export default function getHexConversions(hex: string): HexConversions {
  if (!hex) return undefined;

  const adjustedHex = getHexFromString(hex);

  // convert color to hex value
  // eg: hex === "blue" -> c.colorToHex("blue") -> "#0000ff"
  // This won't work alongside the current validation approach.
  const colorToHex = "";
  // if (c.isColor(hex)) {
  //   colorToHex = c.colorToHex(hex);
  // }

  return {
    toRGB: c.hexToRgb(adjustedHex),
    toRGBA: {
      ...c.hexToRgba(adjustedHex),
      a: parseFloat(c.hexToRgba(adjustedHex).a.toFixed(2)),
    },
    toCMYK: c.hexToCmyk(adjustedHex),
    toHSL: c.hexToHsl(adjustedHex),
    toHSLA: {
      ...c.hexToHsla(adjustedHex),
      a: parseFloat(c.hexToHsla(adjustedHex).a.toFixed(2)),
    },
    adjustedHex,
    colorToHex,
  };
}

/**
 * CURRENTLY UNUSED....
 *
 * Attempts to format user input into a hex value
 *
 * @param hex random user input
 * @returns a valid hex string, or throws an error
 */
export const getHexFromString = (hex: string) => {
  let adjustedHex = hex.replaceAll("#", "");

  // extend input to be 6 characters
  if (adjustedHex.length < 6) {
    adjustedHex = (adjustedHex + adjustedHex + adjustedHex).slice(0, 6);
  }
  adjustedHex = "#" + adjustedHex;

  if (!c.isHex(adjustedHex)) {
    throw new Error(`${adjustedHex} is an invalid HEX value`);
  }

  return adjustedHex;
};

/**
 * Disects the input and determines if it can be morphed
 * into a Hex value that passes the `c.isHex(adjustedHex)`
 * colors-convert test.
 *
 * This differs from the `getHexFromString` because
 * it just returns a boolean instead of throwing an error.
 * It's ok if this one fails.
 *
 * @param string random user input
 * @returns boolean - `true` | `false`
 */
export const isStringHex = (string: string) => {
  if (!string) return false;

  let adjustedHex = string;
  adjustedHex = adjustedHex.replaceAll("#", "");

  // extend input to be 6 characters
  if (adjustedHex.length < 6) {
    adjustedHex = (adjustedHex + adjustedHex + adjustedHex).slice(0, 6);
  }
  adjustedHex = "#" + adjustedHex;

  if (!c.isHex(adjustedHex)) {
    return false;
  }

  return true;
};
