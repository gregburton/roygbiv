"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shuffle } from "lucide-react";

import { useColorStore } from "@/store";
import HslCard from "../convert/HslCard";
import HslBadge from "../convert/HslBadge";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";
import getHslConversions from "@/lib/utils/hsl";
import generateRandomColor from "@/lib/utils/generate-random-color";
import {
  ConvertHslValues,
  convertHslSchema,
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

const ConvertHslForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);

  const removeSomeColors = useColorStore((state) => state.removeSomeColors);

  const colors = getColorsByFormat(submittedColors, "hsl");
  const colorMap = colors.split("__").filter((val) => !!val);

  const form = useForm<ConvertHslValues>({
    resolver: zodResolver(convertHslSchema),
    defaultValues: { hsl: "" },
  });

  const onSubmit = (values: ConvertHslValues) => {
    const { hsl } = values;
    try {
      const conversions = getHslConversions(hsl);

      if (conversions) {
        // update the value of useLocalStorage
        addAColor(conversions.adjustedHsl);
        setSubmittedColor(conversions.adjustedHsl);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError("hsl", { message: error.message, type: "validate" });
      } else {
        form.setError("hsl", {
          message: "Failed to validate color",
          type: "validate",
        });
      }
    }
  };

  const handleGenerateColor = () => {
    const randomHsl = generateRandomColor("hsl");
    form.setValue("hsl", randomHsl, {
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
              name="hsl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>HSL Value</FormLabel>
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
                        Generate Random HSL Color
                      </TooltipContent>
                    </Tooltip>
                    <FormControl>
                      <Input
                        placeholder="eg: hsl(250, 50%, 50%) || 250 50 50"
                        {...field}
                      />
                    </FormControl>
                    <Button type="submit">Convert</Button>
                  </div>
                  <FormDescription>
                    h: 0-359, s: 0-100, l: 0-100
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
                      form.setValue("hsl", "");
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
                          <HslBadge
                            color={color}
                            handleSubmit={() => {
                              form.setValue("hsl", color, {
                                shouldValidate: true,
                              });
                              form.setFocus("hsl");
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
                          <HslBadge
                            color={color}
                            handleSubmit={() => {
                              form.setValue("hsl", color, {
                                shouldValidate: true,
                              });
                              form.setFocus("hsl");
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

      {submittedColor && <HslCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertHslForm;
