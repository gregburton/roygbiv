import * as c from "colors-convert";

import getHexConversions from "@/lib/utils/hex";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HexCardProps = { color: string; showFooter?: boolean };

const HexCard = ({ color, showFooter }: HexCardProps) => {
  // Handle errors / display fallback state.
  // Sometimes the wrong color slips through...
  if (!c.isHex(color)) {
    return (
      <div className="p-2">
        <em className="text-destructive">{`"${color}" is an invalid HEX value`}</em>
        <p className="text-sm text-muted-foreground">
          Did you mean to use the <code>{`<HexCard />`}</code> here?
        </p>
      </div>
    );
  }

  const conversions = getHexConversions(color);

  if (!conversions) {
    return (
      <p className="text-muted-foreground, text-sm">
        Select a color to convert first...
      </p>
    );
  }

  return (
    <Card>
      <div
        style={{ backgroundColor: conversions.adjustedHex }}
        className="p-0 h-36"
      />
      <CardHeader>
        <CardTitle>{conversions.adjustedHex}</CardTitle>
      </CardHeader>
      <CardContent>
        {conversions && (
          <ul className="space-y-4">
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
            <li>
              <p className="text-muted-foreground text-sm">RGB</p>
              <p>
                rgb(
                {`${conversions.toRGB.r}, ${conversions.toRGB.g}, 
                ${conversions.toRGB.b}`}
                )
              </p>
            </li>
            <li>
              <p className="text-muted-foreground text-sm">RGBA</p>
              {conversions.toRGBA?.a ? (
                <p>
                  rgba(
                  {`${conversions.toRGBA.r}, ${conversions.toRGBA.g}, ${conversions.toRGBA.b}, ${conversions.toRGBA.a}`}
                  )
                </p>
              ) : (
                <p>
                  rgba(
                  {`${conversions.toRGBA.r}, ${conversions.toRGBA.g}, ${conversions.toRGBA.b}`}
                  )
                </p>
              )}
            </li>
          </ul>
        )}
      </CardContent>
      {showFooter && (
        <CardFooter className="text-sm text-muted-foreground">
          The original input value has been converted to
          {` "${conversions?.adjustedHex}"`}
        </CardFooter>
      )}
    </Card>
  );
};

export default HexCard;
