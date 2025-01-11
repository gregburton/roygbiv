import * as c from "colors-convert";
import { X } from "lucide-react";

import { useColorStore } from "@/store";
import maxContrast from "@/lib/utils/max-contrast";

import { Button } from "@/components/ui/button";
import { getHslObjFromString } from "@/lib/utils/hsl";

type HslBadgeProps = {
  color: string;
  handleSubmit: () => void;
};

const HslBadge = ({ color, handleSubmit }: HslBadgeProps) => {
  const removeAColor = useColorStore((state) => state.removeAColor);

  const validHslObject = getHslObjFromString(color);
  const toRgb = c.hslToRgb(validHslObject);
  const constrasted = maxContrast(toRgb.r, toRgb.g, toRgb.b);

  return (
    <div className="flex items-center">
      <button
        type="submit"
        onClick={handleSubmit}
        className="p-1 border-none bg-background text-xs rounded-md"
        style={{
          backgroundColor: color,
          color: constrasted,
        }}
      >
        {color}
      </button>
      <Button
        type="button"
        variant="ghost"
        className="rounded-none self-center p-0 bg-background w-5 h-5"
        onClick={() => removeAColor(color)}
      >
        <X />
      </Button>
    </div>
  );
};

export default HslBadge;
