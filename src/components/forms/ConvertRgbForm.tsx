"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shuffle } from "lucide-react";

import { useColorStore } from "@/store";
import RgbCard from "../convert/RgbCard";
import RgbBadge from "../convert/RgbBadge";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";
import getRgbConversions from "@/lib/utils/rgb";
import generateRandomColor from "@/lib/utils/generate-random-color";
import {
  ConvertRgbValues,
  convertRgbSchema,
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

const ConvertRgbForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);

  const removeSomeColors = useColorStore((state) => state.removeSomeColors);

  const colors = getColorsByFormat(submittedColors, "rgb");
  const colorMap = colors.split("__").filter((val) => !!val);

  const form = useForm<ConvertRgbValues>({
    resolver: zodResolver(convertRgbSchema),
    defaultValues: { rgb: "" },
  });

  const onSubmit = (values: ConvertRgbValues) => {
    const { rgb } = values;
    try {
      const conversions = getRgbConversions(rgb);

      if (conversions) {
        // update the value of useLocalStorage
        addAColor(conversions.adjustedRgb);
        setSubmittedColor(conversions.adjustedRgb);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError("rgb", { message: error.message, type: "validate" });
      } else {
        form.setError("rgb", {
          message: "Failed to validate color",
          type: "validate",
        });
      }
    }
  };

  const handleGenerateColor = () => {
    const randomRgb = generateRandomColor("rgb");
    form.setValue("rgb", randomRgb, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <form
        id="rgb-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-5"
      >
        <FieldGroup>
          <Controller
            name="rgb"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="rgb">RGB Value</FieldLabel>

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
                      Generate Random RGB Color
                    </TooltipContent>
                  </Tooltip>
                  <Input
                    {...field}
                    id="rgb"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg: rgb(155, 50, 50) || 155 50 50"
                    autoComplete="off"
                  />
                  <Button type="submit" form="rgb-form">
                    Convert
                  </Button>
                </div>
                <FieldDescription>
                  r: 0-255, g: 0-255, b: 0-255
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
                    form.setValue("rgb", "");
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
                        <RgbBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("rgb", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("rgb");
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
                        <RgbBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("rgb", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("rgb");
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

      {submittedColor && <RgbCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertRgbForm;
