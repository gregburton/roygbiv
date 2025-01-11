import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getColorObjectFromInput } from "@/lib/utils/get-color-object-from-input";

type ColorCardProps = {
  color: string;
  showColor?: boolean;
  showFooter?: boolean;
};

const ColorCard = ({
  color,
  showColor = true,
  showFooter = true,
}: ColorCardProps) => {
  // Handle errors / display fallback state.
  // Sometimes the wrong color slips through...
  // if (!color.startsWith("cmyk(")) {
  //   return (
  //     <div className="p-2">
  //       <em className="text-destructive">{`"${color}" is an invalid CMYK value`}</em>
  //       <p className="text-sm text-muted-foreground">
  //         Did you mean to use the <code>{`<ColorCard />`}</code> here?
  //       </p>
  //     </div>
  //   );
  // }

  const conversions = getColorObjectFromInput(color);

  if (!conversions) {
    return (
      <p className="text-muted-foreground, text-sm">
        Select a color to convert first...
      </p>
    );
  }

  return (
    <Card>
      {showColor && (
        <div className="grid h-36 overflow-hidden">
          <div
            style={{
              backgroundColor:
                conversions.backgroundColor || conversions.formattedColor,
            }}
            className="col-start-1 row-start-1 p-0 z-10"
          />
          <div className="col-start-1 row-start-1 bg-[url('/images/png-background.png')] bg-repeat" />
        </div>
      )}
      <CardHeader>
        <CardTitle>{conversions.formattedColor}</CardTitle>
        <CardDescription>
          {`${conversions.formattedColor?.replaceAll("%", "")}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {conversions && (
          <ul className="space-y-4">
            {conversions.toHEX && (
              <li>
                <p className="text-muted-foreground text-sm">HEX</p>
                <p>{conversions.toHEX}</p>
              </li>
            )}
            {conversions.toHSL && (
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
            )}
            {conversions.toHSLA && (
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
            )}
            {conversions.toRGB && (
              <li>
                <p className="text-muted-foreground text-sm">RGB</p>
                <p>
                  rgb(
                  {`${conversions.toRGB.r}, ${conversions.toRGB.g}, 
                ${conversions.toRGB.b}`}
                  )
                </p>
              </li>
            )}
            {conversions.toRGBA && (
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
            )}
          </ul>
        )}
      </CardContent>
      {showFooter && (
        <CardFooter className="text-sm text-muted-foreground flex-col gap-y-3">
          <p>
            The original input value has been converted to
            {` "${conversions.formattedColor}"`}
          </p>
          {!conversions.toCMYK && (
            <p>
              Note that CMYK values cannot be accurately represented on digital
              screens. The true color being displayed is the RGB value.
            </p>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ColorCard;
