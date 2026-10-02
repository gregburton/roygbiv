"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shuffle } from "lucide-react";

import { useColorStore } from "@/store";
import HslaCard from "../convert/HslaCard";
import HslaBadge from "../convert/HslaBadge";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";
import getHslaConversions from "@/lib/utils/hsla";
import generateRandomColor from "@/lib/utils/generate-random-color";
import {
  ConvertHslaValues,
  convertHslaSchema,
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

const ConvertHslaForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);

  const removeSomeColors = useColorStore((state) => state.removeSomeColors);

  const colors = getColorsByFormat(submittedColors, "hsla");
  const colorMap = colors.split("__").filter((val) => !!val);

  const form = useForm<ConvertHslaValues>({
    resolver: zodResolver(convertHslaSchema),
    defaultValues: { hsla: "" },
  });

  const onSubmit = (values: ConvertHslaValues) => {
    const { hsla } = values;
    try {
      const conversions = getHslaConversions(hsla);

      if (conversions) {
        // update the value of useLocalStorage
        addAColor(conversions.adjustedHsla);
        setSubmittedColor(conversions.adjustedHsla);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError("hsla", { message: error.message, type: "validate" });
      } else {
        form.setError("hsla", {
          message: "Failed to validate color",
          type: "validate",
        });
      }
    }
  };

  const handleGenerateColor = () => {
    const randomHsla = generateRandomColor("hsla");
    form.setValue("hsla", randomHsla, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <form
        id="hsla-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-5"
      >
        <FieldGroup>
          <Controller
            name="hsla"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="hsla">HSLA Value</FieldLabel>

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
                      Generate Random HSLA Color
                    </TooltipContent>
                  </Tooltip>
                  <Input
                    {...field}
                    id="hsla"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg: hsla(250, 50%, 50%, 0.5) || 250 50 50 0.5"
                    autoComplete="off"
                  />
                  <Button type="submit" form="hsla-form">
                    Convert
                  </Button>
                </div>
                <FieldDescription>
                  h: 0-359, s: 0-100, l: 0-100, a: 0-1
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
                    form.setValue("hsla", "");
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
                        <HslaBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("hsla", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("hsla");
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
                        <HslaBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("hsla", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("hsla");
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

      {submittedColor && <HslaCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertHslaForm;
