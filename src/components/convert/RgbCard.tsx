import getRgbConversions from "@/lib/utils/rgb";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RgbCardProps = { color: string; showFooter?: boolean };

const RgbCard = ({ color, showFooter }: RgbCardProps) => {
  // Handle errors / display fallback state.
  // Sometimes the wrong color slips through...
  if (!color.startsWith("rgb(")) {
    return (
      <div className="p-2">
        <em className="text-destructive">{`"${color}" is an invalid RGB value`}</em>
        <p className="text-sm text-muted-foreground">
          Did you mean to use the <code>{`<RgbCard />`}</code> here?
        </p>
      </div>
    );
  }

  const conversions = getRgbConversions(color);

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
        style={{ backgroundColor: conversions.adjustedRgb }}
        className="p-0 h-36"
      />
      <CardHeader>
        <CardTitle>{conversions.adjustedRgb}</CardTitle>
      </CardHeader>
      <CardContent>
        {conversions && (
          <ul className="space-y-4">
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
          {` "${conversions.adjustedRgb}"`}
        </CardFooter>
      )}
    </Card>
  );
};

export default RgbCard;
