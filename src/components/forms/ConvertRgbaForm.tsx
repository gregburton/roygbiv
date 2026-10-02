"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shuffle } from "lucide-react";

import { useColorStore } from "@/store";
import RgbaCard from "../convert/RgbaCard";
import RgbaBadge from "../convert/RgbaBadge";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";
import getRgbaConversions from "@/lib/utils/rgba";
import generateRandomColor from "@/lib/utils/generate-random-color";
import {
  ConvertRgbaValues,
  convertRgbaSchema,
} from "./schemas/convert-colors-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ConvertRgbaForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);

  const removeSomeColors = useColorStore((state) => state.removeSomeColors);

  const colors = getColorsByFormat(submittedColors, "rgba");
  const colorMap = colors.split("__").filter((val) => !!val);

  const form = useForm<ConvertRgbaValues>({
    resolver: zodResolver(convertRgbaSchema),
    defaultValues: { rgba: "" },
  });

  const onSubmit = (values: ConvertRgbaValues) => {
    const { rgba } = values;
    try {
      const conversions = getRgbaConversions(rgba);

      if (conversions) {
        // update the value of useLocalStorage
        addAColor(conversions.adjustedRgba);
        setSubmittedColor(conversions.adjustedRgba);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError("rgba", { message: error.message, type: "validate" });
      } else {
        form.setError("rgba", {
          message: "Failed to validate color",
          type: "validate",
        });
      }
    }
  };

  const handleGenerateColor = () => {
    const randomRgba = generateRandomColor("rgba");
    form.setValue("rgba", randomRgba, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <form
        id="rgba-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-5"
      >
        <FieldGroup>
          <Controller
            name="rgba"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="rgba">RGBA Value</FieldLabel>

                <div className="flex items-center gap-x-2">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          type="button"
                          size="icon"
                          className="shrink-0"
                          variant="secondary"
                          onClick={handleGenerateColor}
                        >
                          <Shuffle />
                        </Button>
                      }
                    />
                    <TooltipContent align="start" side="bottom">
                      Generate Random RGBA Color
                    </TooltipContent>
                  </Tooltip>
                  <Input
                    {...field}
                    id="rgba"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg: rgba(155, 50, 50, 0.5) || 155 50 50 0.5"
                    autoComplete="off"
                  />
                  <Button type="submit" form="rgba-form">
                    Convert
                  </Button>
                </div>
                <FieldDescription>
                  r: 0-255, g: 0-255, b: 0-255, a:0-1
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {colorMap.length > 0 && (
            <div>
              <div className="flex items-baseline gap-x-3 mb-2">
                <p className="text-xs text-muted-foreground mb-1">
                  Previous colors:
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="text-xs py-0.5 px-1 h-auto"
                  onClick={() => {
                    removeSomeColors(colorMap);
                    form.setValue("rgba", "");
                  }}
                >
                  remove all
                </Button>
              </div>

              {/* Badges */}
              <Collapsible>
                <div className="flex flex-col gap-2">
                  <ul className="flex flex-wrap gap-x-3 gap-y-2">
                    {/* Always visible badges */}
                    {colorMap.slice(0, 8).map((color) => (
                      <li key={color}>
                        <RgbaBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("rgba", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("rgba");
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  {/* only show a few colors until this button is clicked */}
                  {colorMap.slice(8).length > 0 && (
                    <CollapsibleTrigger
                      render={
                        <Button
                          type="button"
                          variant="outline"
                          className="text-xs"
                          size="sm"
                        >
                          Toggle {colorMap.slice(8).length} older colors
                        </Button>
                      }
                    />
                  )}
                </div>
                <CollapsibleContent>
                  <ul className="flex flex-wrap gap-x-3 gap-y-2 mt-2">
                    {/* Always visible badges */}
                    {colorMap.slice(8).map((color) => (
                      <li key={color}>
                        <RgbaBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("rgba", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("rgba");
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </FieldGroup>
      </form>

      {submittedColor && <RgbaCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertRgbaForm;
