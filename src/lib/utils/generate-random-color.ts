import * as c from "colors-convert";
import { ColorFormats } from "@/types";

export default function generateRandomColor(format: ColorFormats | "random") {
  const randHslAlpha = Math.random();
  const randRgbAlpha = Math.random();

  switch (format) {
    case "random":
      const options = [
        `cmyk(${Math.floor(Math.random() * 101)}%, ${Math.floor(
          Math.random() * 101
        )}%, ${Math.floor(Math.random() * 101)}%, ${Math.floor(
          Math.random() * 101
        )}%)`,
        c.randomHex(),
        `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(
          Math.random() * 101
        )}%, ${Math.floor(Math.random() * 101)}%)`,
        `hsla(${Math.floor(Math.random() * 360)}, ${Math.floor(
          Math.random() * 101
        )}%, ${Math.floor(Math.random() * 101)}%, ${
          randHslAlpha >= 0.96 ? 1 : Number(randHslAlpha.toFixed(2))
        })`,
        `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, ${
          randRgbAlpha >= 0.96 ? 1 : Number(randRgbAlpha.toFixed(2))
        })`,
      ];

      return options[Math.floor(Math.random() * options.length)];

    case "cmyk":
      return `cmyk(${Math.floor(Math.random() * 101)}%, ${Math.floor(
        Math.random() * 101
      )}%, ${Math.floor(Math.random() * 101)}%, ${Math.floor(
        Math.random() * 101
      )}%)`;

    case "hex":
      return c.randomHex();

    case "hsl":
      return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(
        Math.random() * 101
      )}%, ${Math.floor(Math.random() * 101)}%)`;

    case "hsla":
      return `hsla(${Math.floor(Math.random() * 360)}, ${Math.floor(
        Math.random() * 101
      )}%, ${Math.floor(Math.random() * 101)}%, ${
        randHslAlpha >= 0.96 ? 1 : Number(randHslAlpha.toFixed(2))
      })`;

    case "rgb":
      return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;

    case "rgba":
      return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${
        randRgbAlpha >= 0.96 ? 1 : Number(randRgbAlpha.toFixed(2))
      })`;

    default:
      console.error("Invalid or missing color format");
      return "";
  }
}
