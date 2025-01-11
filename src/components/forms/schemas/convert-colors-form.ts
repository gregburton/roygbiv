import { z } from "zod";

export const convertColorSchema = z.object({
  color: z.string().trim().min(3, "3 char minimum"),
});
export type ConvertColorValues = z.infer<typeof convertColorSchema>;

export const convertHexSchema = z.object({
  hex: z.string().trim().min(3, "3 char minimum"),
});
export type ConvertHexValues = z.infer<typeof convertHexSchema>;

export const convertCmykSchema = z.object({
  cmyk: z.string().trim().min(7, "7 char minimum - eg: 0 0 0 0"),
});
export type ConvertCmykValues = z.infer<typeof convertCmykSchema>;

export const convertHslSchema = z.object({
  hsl: z.string().trim().min(5, "5 char minimum - eg: 0 0 0"),
});
export type ConvertHslValues = z.infer<typeof convertHslSchema>;

export const convertHslaSchema = z.object({
  hsla: z.string().trim().min(7, "7 char minimum - eg: 0 0 0 1"),
});
export type ConvertHslaValues = z.infer<typeof convertHslaSchema>;

export const convertRgbSchema = z.object({
  rgb: z.string().trim().min(5, "5 char minimum - eg: 0 0 0"),
});
export type ConvertRgbValues = z.infer<typeof convertRgbSchema>;

export const convertRgbaSchema = z.object({
  rgba: z.string().trim().min(7, "7 char minimum - eg: 0 0 0 1"),
});
export type ConvertRgbaValues = z.infer<typeof convertRgbaSchema>;
