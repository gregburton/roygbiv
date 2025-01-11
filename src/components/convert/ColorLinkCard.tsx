import Link from "next/link";

import HexCard from "./HexCard";
import CmykCard from "./CmykCard";
import HslCard from "./HslCard";
import { ColorLink } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import HslaCard from "./HslaCard";
import RgbCard from "./RgbCard";
import RgbaCard from "./RgbaCard";
import { ArrowRightCircle } from "lucide-react";

const ColorLinkCard = ({ link }: { link: ColorLink }) => {
  return (
    <Card key={link.label}>
      <Link
        href={link.url}
        className="block hover:bg-accent/80 transition-colors group"
      >
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>{link.label}</CardTitle>
            <CardDescription>{link.description}</CardDescription>
          </div>
          <ArrowRightCircle className="w-8 h-8 stroke-muted-foreground transition-all mr-2 group-hover:stroke-foreground group-hover:mr-0" />
        </CardHeader>
      </Link>
      <Collapsible>
        <CardContent>
          <CollapsibleTrigger asChild className="mt-2">
            <Button>See an example</Button>
          </CollapsibleTrigger>
        </CardContent>
        <CardFooter className="px-0 pb-0">
          <CollapsibleContent className="w-full">
            {link.label === "CMYK" && (
              <CmykCard color={link.example} showFooter />
            )}
            {link.label === "HEX" && <HexCard color={link.example} />}
            {link.label === "HSL" && <HslCard color={link.example} />}
            {link.label === "HSLA" && <HslaCard color={link.example} />}
            {link.label === "RGB" && <RgbCard color={link.example} />}
            {link.label === "RGBA" && <RgbaCard color={link.example} />}
          </CollapsibleContent>
        </CardFooter>
      </Collapsible>
    </Card>
  );
};

export default ColorLinkCard;
