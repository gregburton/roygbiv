"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shuffle } from "lucide-react";

import { useColorStore } from "@/store";
import HexBadge from "@/components/convert/HexBadge";
import HexCard from "../convert/HexCard";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";
import getHexConversions from "@/lib/utils/hex";
import generateRandomColor from "@/lib/utils/generate-random-color";
import {
  ConvertHexValues,
  convertHexSchema,
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ConvertHexForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);

  const removeSomeColors = useColorStore((state) => state.removeSomeColors);

  const colors = getColorsByFormat(submittedColors, "hex");
  const colorMap = colors.split("__").filter((val) => !!val);

  const form = useForm<ConvertHexValues>({
    resolver: zodResolver(convertHexSchema),
    defaultValues: { hex: "" },
  });

  const onSubmit = (values: ConvertHexValues) => {
    const { hex } = values;
    try {
      const conversions = getHexConversions(hex);

      if (conversions) {
        // update the value of useLocalStorage
        addAColor(conversions.adjustedHex);
        setSubmittedColor(conversions.adjustedHex);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError("hex", { message: error.message, type: "validate" });
      } else {
        form.setError("hex", {
          message: "Failed to validate color",
          type: "validate",
        });
      }
    }
  };

  const handleGenerateColor = () => {
    const randomHex = generateRandomColor("hex");
    form.setValue("hex", randomHex, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <form
        id="hex-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-5"
      >
        <FieldGroup>
          <Controller
            name="hex"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="hex">HEX Value</FieldLabel>

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
                      Generate Random HEX Color
                    </TooltipContent>
                  </Tooltip>
                  <Input
                    {...field}
                    id="hex"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg: #0284c7 || 133337 || 007"
                    autoComplete="off"
                  />
                  <Button type="submit" form="hex-form">
                    Convert
                  </Button>
                </div>
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
                    form.setValue("hex", "");
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
                        <HexBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("hex", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("hex");
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
                        <HexBadge
                          color={color}
                          handleSubmit={() => {
                            form.setValue("hex", color, {
                              shouldValidate: true,
                            });
                            form.setFocus("hex");
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

      {submittedColor && <HexCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertHexForm;
