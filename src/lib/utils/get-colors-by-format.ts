import { ColorFormats } from "@/types";

/**
 *
 * @param allColors The current state of `submittedColors` in the useColorStore
 * @param format The desired color format to return.
 * ```tsx
 * export type ColorFormats = "cmyk" | "hex" | "hsl" | "hsla" | "rgb" | "rgba";
 * ```
 * @returns A filtered value of the useColorStore's `submittedColors` state
 *
 * @example
 * ```tsx
 * // ...somewhere in your component...
 *
 * const submittedColors = useColorStore((state) => state.submittedColors);
 * // ↑ "#00bfff__#ff6493__rgb(0, 191, 255)__hsl(195, 100%, 50%)__cmyk(100%, 25%, 0%, 0%)"
 * const colors = getColorsByFormat(submittedColors, "hex");
 * // ↑ "##00bfff__#ff6493"
 * const colorMap = colors.split("__").filter((val) => !!val);
 * // ↑ Array ["#00bfff", "#ff6493"]
 *
 * return (
 *    {colorMap.map((color) => {
 *       const toRgb = c.hexToRgb(color);
 *       const constrasted = maxContrast(toRgb.r, toRgb.g, toRgb.b);
 *       return (
 *           <button
 *             type="button"
 *             onClick={() => removeAColor(color)}
 *             className="p-1 border-none bg-background text-xs rounded-md"
 *             style={{ backgroundColor: color, color: constrasted }}
 *           >
 *             <X />
 *           </button>
 *         );
 *    })}
 * )
 * // ...
 * ```
 *
 * @notes
 * I tried setting this as a function on the useColorStore at first,
 * but it didn't cause the badges to disappear when calling the useColorStore's
 * `removeAColor` state setter. This function is unaltered. Something about
 * having it on the useColorStore was causing issues with re-renders.
 */
export default function getColorsByFormat(
  allColors: string,
  format: ColorFormats
): string {
  let value = allColors;
  if (value && format) {
    switch (format) {
      case "cmyk":
        value = value
          .split("__")
          .filter((val) => val.includes("cmyk("))
          .join("__");
        break;
      case "hex":
        value = value
          .split("__")
          .filter((val) => val.includes("#"))
          .join("__");
        break;
      case "hsl":
        value = value
          .split("__")
          .filter((val) => val.includes("hsl("))
          .join("__");
        break;
      case "hsla":
        value = value
          .split("__")
          .filter((val) => val.includes("hsla("))
          .join("__");
        break;
      case "rgb":
        value = value
          .split("__")
          .filter((val) => val.includes("rgb("))
          .join("__");
        break;
      case "rgba":
        value = value
          .split("__")
          .filter((val) => val.includes("rgba("))
          .join("__");
        break;

      default:
        break;
    }
  }
  return value;
}
