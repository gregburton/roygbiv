import getCmykConversions, { isStringCmyk } from "./cmyk";
import getHexConversions, { isStringHex } from "./hex";
import getHslConversions, { isStringHsl } from "./hsl";
import getHslaConversions, { isStringHsla } from "./hsla";
import getRgbConversions, { isStringRgb } from "./rgb";
import getRgbaConversions, { isStringRgba } from "./rgba";
import { ColorConversions } from "@/types/conversions";

/**
 * Takes random user input and returns a big object containing
 * any of the posible results. Covers all bases.
 *
 * @param text the unknown string the client enters in
 * @returns  An object that contains the found conversions. All properties are
 * optional since it can't really be known which properties are going to be
 * returned.
 *
 * There are two special properties: `formattedColor` and `backgroundColor`.
 * `formattedColor` is the color to display as the result. This property
 * makes it so I don't have to deal with "adjustedHex", "adjustedRgb" etc...
 * `backgroundColor` is even more special, used for a color that cannot be
 * displayed on screen correctly. Specifically for CMYK. Such a color would
 * have to return a different conversion, such as its "toRGB" object.
 */
export const getColorObjectFromInput = (text: string): ColorConversions => {
  if (!text) return;

  let colorObject: ColorConversions = {};

  const isCmyk = isStringCmyk(text);
  const isHex = isStringHex(text);
  const isHsl = isStringHsl(text);
  const isHsla = isStringHsla(text);
  const isRgb = isStringRgb(text);
  const isRgba = isStringRgba(text);

  // Sometimes a value can be interpreted as multiple color types.
  // For example, a numArray of `[100, 20, 50, 0.1]` will pass as
  // being a CYMK, HSLA, and RGBA. Whichever of these is specificed
  // first in the `fallbacks` if chain will be the one displayed,
  // despite the text including its true target color.

  // Manually handle how to decide between each one.
  // Make an array of the bools. if there are more than 2 truthy values
  // then a match has been found and we need to decide how to best find
  // the user's target color.
  const moreThanOneMatch =
    [isCmyk, isHex, isHsl, isHsla, isRgb, isRgba].filter((bool) => !!bool)
      .length > 1;

  if (moreThanOneMatch) {
    if (text.includes("hsla")) {
      const hslaConversions = getHslaConversions(text);
      return (colorObject = {
        ...colorObject,
        ...hslaConversions,
        formattedColor: hslaConversions?.adjustedHsla,
      });
    } else if (text.includes("hsl")) {
      const hslConversions = getHslConversions(text);
      return (colorObject = {
        ...colorObject,
        ...hslConversions,
        formattedColor: hslConversions?.adjustedHsl,
      });
    } else if (text.includes("cmyk")) {
      const cmykConversions = getCmykConversions(text);
      colorObject = {
        ...colorObject,
        ...cmykConversions,
        formattedColor: cmykConversions?.adjustedCmyk,
        // CMYK cannot be displayed correctly on a screen, so replace it with the RGB value instead.
        backgroundColor: `rgb(${cmykConversions?.toRGB.r},${cmykConversions?.toRGB.g},${cmykConversions?.toRGB.b})`,
      };
    } else if (text.includes("rgba")) {
      const rgbaConversions = getRgbaConversions(text);
      return (colorObject = {
        ...colorObject,
        ...rgbaConversions,
        formattedColor: rgbaConversions?.adjustedRgba,
      });
    } else if (text.includes("rgb")) {
      const rgbConversions = getRgbConversions(text);
      return (colorObject = {
        ...colorObject,
        ...rgbConversions,
        formattedColor: rgbConversions?.adjustedRgb,
      });
    }
  }

  // fallbacks
  // Couldn't determine the user's intentions above, so
  // try to find anything at all to display.
  if (isCmyk) {
    const cmykConversions = getCmykConversions(text);
    colorObject = {
      ...colorObject,
      ...cmykConversions,
      formattedColor: cmykConversions?.adjustedCmyk,
      // CMYK cannot be displayed correctly on a screen, so replace it with the RGB value instead.
      backgroundColor: `rgb(${cmykConversions?.toRGB.r},${cmykConversions?.toRGB.g},${cmykConversions?.toRGB.b})`,
    };
    return colorObject;
  } else if (isHex) {
    const hexConversions = getHexConversions(text);
    return (colorObject = {
      ...colorObject,
      ...hexConversions,
      formattedColor: hexConversions?.adjustedHex,
    });
  } else if (isHsla) {
    const hslaConversions = getHslaConversions(text);
    return (colorObject = {
      ...colorObject,
      ...hslaConversions,
      formattedColor: hslaConversions?.adjustedHsla,
    });
  } else if (isHsl) {
    const hslConversions = getHslConversions(text);
    return (colorObject = {
      ...colorObject,
      ...hslConversions,
      formattedColor: hslConversions?.adjustedHsl,
    });
  } else if (isRgba) {
    const rgbaConversions = getRgbaConversions(text);
    return (colorObject = {
      ...colorObject,
      ...rgbaConversions,
      formattedColor: rgbaConversions?.adjustedRgba,
    });
  } else if (isRgb) {
    const rgbConversions = getRgbConversions(text);
    return (colorObject = {
      ...colorObject,
      ...rgbConversions,
      formattedColor: rgbConversions?.adjustedRgb,
    });
  } else {
    // console.warn("invalid input");
    throw new Error("Invalid input!");
  }
};
