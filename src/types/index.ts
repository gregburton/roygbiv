import {
  CmykConversions,
  HexConversions,
  HslConversions,
  HslaConversions,
  RgbConversions,
  RgbaConversions,
} from "@/types/conversions";

export type ColorFormats = "cmyk" | "hex" | "hsl" | "hsla" | "rgb" | "rgba";
export type ColorLabel = "CMYK" | "HEX" | "HSL" | "HSLA" | "RGB" | "RGBA";

export type ColorLink = {
  url: string;
  label: ColorLabel;
  description: string;
  example: string;
  cmykConversions?: CmykConversions;
  hexConversions?: HexConversions;
  hslConversions?: HslConversions;
  hslaConversions?: HslaConversions;
  rgbConversions?: RgbConversions;
  rgbaConversions?: RgbaConversions;
};
