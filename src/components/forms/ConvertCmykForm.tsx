"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shuffle } from "lucide-react";

import { useColorStore } from "@/store";
import CmykCard from "../convert/CmykCard";
import CmykBadge from "../convert/CmykBadge";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";
import getCmykConversions from "@/lib/utils/cmyk";
import generateRandomColor from "@/lib/utils/generate-random-color";
import {
  ConvertCmykValues,
  convertCmykSchema,
} from "./schemas/convert-colors-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ConvertCmykForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);

  const removeSomeColors = useColorStore((state) => state.removeSomeColors);

  const colors = getColorsByFormat(submittedColors, "cmyk");
  const colorMap = colors.split("__").filter((val) => !!val);

  const form = useForm<ConvertCmykValues>({
    resolver: zodResolver(convertCmykSchema),
    defaultValues: { cmyk: "" },
  });

  const onSubmit = (values: ConvertCmykValues) => {
    const { cmyk } = values;
    try {
      const conversions = getCmykConversions(cmyk);

      if (conversions) {
        // update the value of useLocalStorage
        addAColor(conversions.adjustedCmyk);
        setSubmittedColor(conversions.adjustedCmyk);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError("cmyk", { message: error.message, type: "validate" });
      } else {
        form.setError("cmyk", {
          message: "Failed to validate color",
          type: "validate",
        });
      }
    }
  };

  const handleGenerateColor = () => {
    const randomCmyk = generateRandomColor("cmyk");
    form.setValue("cmyk", randomCmyk, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <form
        id="cmyk-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-5"
      >
        <FieldGroup>
          <Controller
            name="cmyk"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="cmyk">CMYK Value</FieldLabel>

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
                      Generate Random CMYK Color
                    </TooltipContent>
                  </Tooltip>
                  <Input
                    {...field}
                    id="cmyk"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg: cmyk(100%, 25%, 0%, 0%) || 100 25 0 0"
                    autoComplete="off"
                  />
                  <Button type="submit" form="cmyk-form">
                    Convert
                  </Button>
                </div>
                <FieldDescription>
                  c: 0-100, m: 0-100, y: 0-100, k: 0-100
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
                    form.setValue("cmyk", "");
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
                        <CmykBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("cmyk", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("cmyk");
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
                        <CmykBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("cmyk", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("cmyk");
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

      {submittedColor && <CmykCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertCmykForm;
