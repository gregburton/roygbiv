"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, Shuffle } from "lucide-react";

import { useColorStore } from "@/store";
import generateRandomColor from "@/lib/utils/generate-random-color";
import { getColorObjectFromInput } from "@/lib/utils/get-color-object-from-input";
import {
  ConvertColorValues,
  convertColorSchema,
} from "./schemas/convert-colors-form";

import ColorCard from "../color-card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isStringCmyk } from "@/lib/utils/cmyk";
import { isStringHsl } from "@/lib/utils/hsl";
import { isStringHsla } from "@/lib/utils/hsla";
import { isStringRgb } from "@/lib/utils/rgb";
import { isStringRgba } from "@/lib/utils/rgba";
import stripInputToNumberArray from "@/lib/utils/strip-input-to-numbers";

const ConvertForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const [target, setTarget] = useState("");
  // const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);
  const conversions = getColorObjectFromInput(submittedColor);

  const form = useForm<ConvertColorValues>({
    resolver: zodResolver(convertColorSchema),
    defaultValues: { color: "" },
  });

  const onSubmit = (values: ConvertColorValues) => {
    const { color } = values;

    try {
      const conversions = getColorObjectFromInput(color);

      if (conversions?.formattedColor) {
        // update the value of useLocalStorage
        addAColor(conversions.formattedColor);
        setSubmittedColor(conversions.formattedColor);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError("color", { message: error.message, type: "validate" });
      } else {
        form.setError("color", {
          message: "Failed to validate color",
          type: "validate",
        });
      }
    }
  };

  const handleGenerateColor = () => {
    const randomColor = generateRandomColor("random");
    form.setValue("color", randomColor, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const handleSwapTarget = (target: string) => {
    setTarget(target);
    form.setValue(
      "color",
      `${
        getColorObjectFromInput(
          `${target}${stripInputToNumberArray(submittedColor).join(" ")}`,
        )?.formattedColor
      }`,
      {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      },
    );
  };

  return (
    <>
      <form
        id="convert-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full"
        style={{
          backgroundColor:
            conversions?.backgroundColor || conversions?.formattedColor,
        }}
      >
        <div className="translate-y-5 max-w-md mx-auto bg-background p-5 rounded-md">
          <FieldGroup>
            <Controller
              name="color"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="color-value">Color Value</FieldLabel>
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
                        Generate Random Color
                      </TooltipContent>
                    </Tooltip>
                    <Input
                      {...field}
                      id="color-value"
                      aria-invalid={fieldState.invalid}
                      placeholder="Put color code here!"
                      autoComplete="off"
                    />
                    <div className="flex">
                      <Button
                        type="submit"
                        form="convert-form"
                        className="rounded-r-none border-r"
                      >
                        Convert
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              type="button"
                              variant="default"
                              size="icon"
                              className="rounded-l-none"
                            >
                              <ArrowDown />
                            </Button>
                          }
                        />
                        <DropdownMenuContent
                          className="w-56"
                          // onCloseAutoFocus={(e) => {
                          //   e.preventDefault();
                          //   form.setFocus("color");
                          // }}
                        >
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>
                              Convert Input Color
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={target}
                              onValueChange={handleSwapTarget}
                            >
                              <DropdownMenuRadioItem
                                value="cmyk"
                                disabled={!isStringCmyk(submittedColor)}
                              >
                                To CMYK
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem
                                value="hsl"
                                disabled={!isStringHsl(submittedColor)}
                              >
                                To HSL
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem
                                value="hsla"
                                disabled={!isStringHsla(submittedColor)}
                              >
                                To HSLA
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem
                                value="rgb"
                                disabled={!isStringRgb(submittedColor)}
                              >
                                To RGB
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem
                                value="rgba"
                                disabled={!isStringRgba(submittedColor)}
                              >
                                To RGBA
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {submittedColor && (
            <ColorCard color={submittedColor} showColor={true} showFooter />
          )}
        </div>
      </form>
    </>
  );
};

export default ConvertForm;
