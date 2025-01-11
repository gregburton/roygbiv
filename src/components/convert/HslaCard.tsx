import getHslaConversions from "@/lib/utils/hsla";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HslaCardProps = { color: string; showFooter?: boolean };

const HslaCard = ({ color, showFooter }: HslaCardProps) => {
  // Handle errors / display fallback state.
  // Sometimes the wrong color slips through...
  if (!color.startsWith("hsla(")) {
    return (
      <div className="p-2">
        <em className="text-destructive">{`"${color}" is an invalid HSLA value`}</em>
        <p className="text-sm text-muted-foreground">
          Did you mean to use the <code>{`<HslaCard />`}</code> here?
        </p>
      </div>
    );
  }

  const conversions = getHslaConversions(color);

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
            backgroundColor: conversions.adjustedHsla,
          }}
          className="col-start-1 row-start-1 p-0 z-10 rounded-t-md"
        />
        <p className="col-start-1 row-start-1 font-semibold text-center">
          {Array.from({ length: 50 }).map(() => "transparent ")}
        </p>
      </div>
      <CardHeader>
        <CardTitle>{conversions.adjustedHsla}</CardTitle>
        <CardDescription>
          {`${conversions.adjustedHsla.replaceAll("%", "")}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {conversions && (
          <ul className="space-y-4">
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
          {` "${conversions.adjustedHsla}"`}
        </CardFooter>
      )}
    </Card>
  );
};

export default HslaCard;
