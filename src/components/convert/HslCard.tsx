import getHslConversions from "@/lib/utils/hsl";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HslCardProps = { color: string; showFooter?: boolean };

const HslCard = ({ color, showFooter }: HslCardProps) => {
  // Handle errors / display fallback state.
  // Sometimes the wrong color slips through...
  if (!color.startsWith("hsl(")) {
    return (
      <div className="p-2">
        <em className="text-destructive">{`"${color}" is an invalid HSL value`}</em>
        <p className="text-sm text-muted-foreground">
          Did you mean to use the <code>{`<HslCard />`}</code> here?
        </p>
      </div>
    );
  }

  const conversions = getHslConversions(color);

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
        style={{ backgroundColor: conversions.adjustedHsl }}
        className="p-0 h-36"
      />
      <CardHeader>
        <CardTitle>{conversions.adjustedHsl}</CardTitle>
        <CardDescription>
          {`${conversions.adjustedHsl.replaceAll("%", "")}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {conversions && (
          <ul className="space-y-4">
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
          {` "${conversions?.adjustedHsl}"`}
        </CardFooter>
      )}
    </Card>
  );
};

export default HslCard;
