import { X } from "lucide-react";

import { useColorStore } from "@/store";
import maxContrast from "@/lib/utils/max-contrast";

import { Button } from "@/components/ui/button";
import { getRgbObjFromString } from "@/lib/utils/rgb";

type RgbBadgeProps = {
  color: string;
  handleSubmit: () => void;
};

const RgbBadge = ({ color, handleSubmit }: RgbBadgeProps) => {
  const removeAColor = useColorStore((state) => state.removeAColor);

  const validRgbObject = getRgbObjFromString(color);
  const constrasted = maxContrast(
    validRgbObject.r,
    validRgbObject.g,
    validRgbObject.b
  );

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

export default RgbBadge;
