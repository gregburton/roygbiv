export type ColorConversions =
  | undefined
  | {
      formattedColor?: string;
      backgroundColor?: string;
      colorToHex?: string;
      colorToCmyk?: string;
      colorToHsl?: string;
      colorToHsla?: string;
      colorToRgb?: string;
      colorToRgba?: string;
      toHEX?: string;

      toCMYK?: {
        c: number;
        m: number;
        y: number;
        k: number;
      };
      toHSL?: {
        h: number;
        s: number;
        l: number;
      };
      toHSLA?: {
        h: number;
        s: number;
        l: number;
        a: number;
      };
      toRGB?: {
        r: number;
        g: number;
        b: number;
      };
      toRGBA?: {
        r: number;
        g: number;
        b: number;
        a?: number;
      };
    };

export type HexConversions =
  | undefined
  | {
      toRGB: {
        r: number;
        g: number;
        b: number;
      };
      toRGBA: {
        r: number;
        g: number;
        b: number;
        a?: number;
      };
      toCMYK: {
        c: number;
        m: number;
        y: number;
        k: number;
      };
      toHSL: {
        h: number;
        s: number;
        l: number;
      };
      toHSLA: {
        h: number;
        s: number;
        l: number;
        a: number;
      };
      adjustedHex: string;
      colorToHex: string;
    };

export type CmykConversions =
  | undefined
  | {
      toHEX: string;
      toRGB: {
        r: number;
        g: number;
        b: number;
      };
      toRGBA: {
        r: number;
        g: number;
        b: number;
        a?: number;
      };
      toHSL: {
        h: number;
        s: number;
        l: number;
      };
      toHSLA: {
        h: number;
        s: number;
        l: number;
        a: number;
      };
      adjustedCmyk: string;
      colorToCmyk: string;
    };

export type HslConversions =
  | undefined
  | {
      toHEX: string;
      toCMYK: {
        c: number;
        m: number;
        y: number;
        k: number;
      };
      toRGB: {
        r: number;
        g: number;
        b: number;
      };
      toRGBA: {
        r: number;
        g: number;
        b: number;
        a?: number;
      };
      toHSLA: {
        h: number;
        s: number;
        l: number;
        a: number;
      };
      adjustedHsl: string;
      colorToHsl: string;
    };

export type HslaConversions =
  | undefined
  | {
      toHEX: string;
      toHSL: {
        h: number;
        s: number;
        l: number;
      };
      toCMYK: {
        c: number;
        m: number;
        y: number;
        k: number;
      };
      toRGB: {
        r: number;
        g: number;
        b: number;
      };
      toRGBA: {
        r: number;
        g: number;
        b: number;
        a?: number;
      };
      adjustedHsla: string;
      colorToHsla: string;
    };

export type RgbConversions =
  | undefined
  | {
      toHEX: string;
      toRGBA: {
        r: number;
        g: number;
        b: number;
        a?: number;
      };
      toHSL: {
        h: number;
        s: number;
        l: number;
      };
      toHSLA: {
        h: number;
        s: number;
        l: number;
        a: number;
      };
      toCMYK: {
        c: number;
        m: number;
        y: number;
        k: number;
      };
      adjustedRgb: string;
      colorToRgb: string;
    };

export type RgbaConversions =
  | undefined
  | {
      toHEX: string;
      toRGB: {
        r: number;
        g: number;
        b: number;
      };
      toHSL: {
        h: number;
        s: number;
        l: number;
      };
      toHSLA: {
        h: number;
        s: number;
        l: number;
        a: number;
      };
      toCMYK: {
        c: number;
        m: number;
        y: number;
        k: number;
      };
      adjustedRgba: string;
      colorToRgba: string;
    };

export type AnyColorConversion =
  | HexConversions
  | CmykConversions
  | HslConversions
  | HslaConversions
  | RgbConversions
  | RgbaConversions;
