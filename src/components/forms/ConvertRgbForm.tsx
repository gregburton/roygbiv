"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5">
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="rgb"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>RGB Value</FormLabel>
                  <div className="flex items-center gap-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="icon"
                          className="shrink-0"
                          variant="secondary"
                          onClick={handleGenerateColor}
                        >
                          <Shuffle />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent align="start" side="bottom">
                        Generate Random RGB Color
                      </TooltipContent>
                    </Tooltip>
                    <FormControl>
                      <Input
                        placeholder="eg: rgb(155, 50, 50) || 155 50 50"
                        {...field}
                      />
                    </FormControl>
                    <Button type="submit">Convert</Button>
                  </div>
                  <FormDescription>
                    r: 0-255, g: 0-255, b: 0-255
                  </FormDescription>
                  <FormMessage />
                </FormItem>
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
                    className="text-xs py-[2px] px-[4px] h-auto"
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
                      <CollapsibleTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="text-xs"
                          size="sm"
                        >
                          Toggle {colorMap.slice(8).length} older colors
                        </Button>
                      </CollapsibleTrigger>
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
          </div>
        </form>
      </Form>

      {submittedColor && <RgbCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertRgbForm;
