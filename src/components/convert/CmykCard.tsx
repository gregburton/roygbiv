import * as c from "colors-convert";

import getCmykConversions, { getCmykObjFromString } from "@/lib/utils/cmyk";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CmykCardProps = { color: string; showFooter?: boolean };

const CmykCard = ({ color, showFooter }: CmykCardProps) => {
  // Handle errors / display fallback state.
  // Sometimes the wrong color slips through...
  if (!color.startsWith("cmyk(")) {
    return (
      <div className="p-2">
        <em className="text-destructive">{`"${color}" is an invalid CMYK value`}</em>
        <p className="text-sm text-muted-foreground">
          Did you mean to use the <code>{`<CmykCard />`}</code> here?
        </p>
      </div>
    );
  }

  const conversions = getCmykConversions(color);

  const validCmykObject = getCmykObjFromString(color);
  const toRgb = c.cmykToRgb(validCmykObject);

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
        style={{ backgroundColor: `rgb(${toRgb.r},${toRgb.g},${toRgb.b})` }}
        className="p-0 h-36"
      />
      <CardHeader>
        <CardTitle>{conversions.adjustedCmyk}</CardTitle>
        <CardDescription>
          {`${conversions.adjustedCmyk.replaceAll("%", "")}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {conversions && (
          <ul className="space-y-4">
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
          Note that CMYK values cannot be accurately represented on digital
          screens. The true color being displayed is the RGB value.
        </CardFooter>
      )}
    </Card>
  );
};

export default CmykCard;
