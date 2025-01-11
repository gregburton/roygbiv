import getRgbaConversions from "@/lib/utils/rgba";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RgbaCardProps = { color: string; showFooter?: boolean };

const RgbaCard = ({ color, showFooter }: RgbaCardProps) => {
  // Handle errors / display fallback state.
  // Sometimes the wrong color slips through...
  if (!color.startsWith("rgba(")) {
    return (
      <div className="p-2">
        <em className="text-destructive">{`"${color}" is an invalid RGBA value`}</em>
        <p className="text-sm text-muted-foreground">
          Did you mean to use the <code>{`<RgbaCard />`}</code> here?
        </p>
      </div>
    );
  }

  const conversions = getRgbaConversions(color);

  if (!conversions) {
    return (
      <p className="text-muted-foreground, text-sm">
        Select a color to convert first...
      </p>
    );
  }

  return (
    <Card>
      <div className="grid h-36 overflow-hidden">
        <div
          style={{
            backgroundColor: conversions.adjustedRgba,
          }}
          className="col-start-1 row-start-1 p-0 z-10 rounded-t-md"
        />
        <p className="col-start-1 row-start-1 font-semibold text-center">
          {Array.from({ length: 50 }).map(() => "transparent ")}
        </p>
      </div>
      <CardHeader>
        <CardTitle>{conversions.adjustedRgba}</CardTitle>
      </CardHeader>
      <CardContent>
        {conversions && (
          <ul className="space-y-4">
            <li>
              <p className="text-muted-foreground text-sm">RGB</p>
              <p>
                rgb(
                {`${conversions.toRGB.r}, ${conversions.toRGB.g}, ${conversions.toRGB.b}`}
                )
              </p>
            </li>
            <li>
              <p className="text-muted-foreground text-sm">CMYK</p>
              <p>
                cmyk(
                {`${conversions.toCMYK.c}, ${conversions.toCMYK.m}, 
                ${conversions.toCMYK.y}, ${conversions.toCMYK.k}`}
                )
              </p>
              <p>
                cmyk(
                {`${conversions.toCMYK.c}%, ${conversions.toCMYK.m}%, 
                ${conversions.toCMYK.y}%, ${conversions.toCMYK.k}%`}
                )
              </p>
            </li>
            <li>
              <p className="text-muted-foreground text-sm">HEX</p>
              <p>{conversions.toHEX}</p>
            </li>
            <li>
              <p className="text-muted-foreground text-sm">HSL</p>
              <p>
                hsl(
                {`${conversions.toHSL.h}, ${conversions.toHSL.s}, 
                ${conversions.toHSL.l}`}
                )
              </p>
              <p>
                hsl(
                {`${conversions.toHSL.h}, ${conversions.toHSL.s}%, 
                ${conversions.toHSL.l}%`}
                )
              </p>
            </li>
            <li>
              <p className="text-muted-foreground text-sm">HSLA</p>
              <p>
                hsla(
                {`${conversions.toHSLA.h}, ${conversions.toHSLA.s}, 
                ${conversions.toHSLA.l}, ${conversions.toHSLA.a}`}
                )
              </p>
              <p>
                hsla(
                {`${conversions.toHSLA.h}, ${conversions.toHSLA.s}%, 
                ${conversions.toHSLA.l}%, ${conversions.toHSLA.a}`}
                )
              </p>
            </li>
          </ul>
        )}
      </CardContent>
      {showFooter && (
        <CardFooter className="text-sm text-muted-foreground">
          The original input value has been converted to
          {` "${conversions.adjustedRgba}"`}
        </CardFooter>
      )}
    </Card>
  );
};

export default RgbaCard;
