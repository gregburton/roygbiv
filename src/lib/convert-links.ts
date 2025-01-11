import getHexConversions from "./utils/hex";
import getCmykConversions from "./utils/cmyk";
import getHslConversions from "./utils/hsl";
import getHslaConversions from "./utils/hsla";
import getRgbConversions from "./utils/rgb";
import getRgbaConversions from "./utils/rgba";
import generateRandomColor from "./utils/generate-random-color";
import { ColorLink } from "@/types";

const cmykExample = generateRandomColor("cmyk");
const hexExample = generateRandomColor("hex");
const hslExample = generateRandomColor("hsl");
const hslaExample = generateRandomColor("hsla");
const rgbExample = generateRandomColor("rgb");
const rgbaExample = generateRandomColor("rgba");

const convertLinks: ColorLink[] = [
  {
    url: "/convert/cmyk",
    label: "CMYK",
    description: "Click to convert a CMYK value",
    example: cmykExample,
    cmykConversions: getCmykConversions(cmykExample),
  },
  {
    url: "/convert/hex",
    label: "HEX",
    description: "Click to convert a HEX value",
    example: hexExample,
    hexConversions: getHexConversions(hexExample),
  },
  {
    url: "/convert/hsl",
    label: "HSL",
    description: "Click to convert an HSL value",
    example: hslExample,
    hslConversions: getHslConversions(hslExample),
  },
  {
    url: "/convert/hsla",
    label: "HSLA",
    description: "Click to convert an HSLA value",
    example: hslaExample,
    hslaConversions: getHslaConversions(hslaExample),
  },
  {
    url: "/convert/rgb",
    label: "RGB",
    description: "Click to convert an RGB value",
    example: rgbExample,
    rgbConversions: getRgbConversions(rgbExample),
  },
  {
    url: "/convert/rgba",
    label: "RGBA",
    description: "Click to convert an RGBA value",
    example: rgbaExample,
    rgbaConversions: getRgbaConversions(rgbaExample),
  },
];

export default convertLinks;
