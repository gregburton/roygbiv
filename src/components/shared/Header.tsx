"use client";

import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header className="border-b border-border shadow-md sticky top-0 bg-background/70 backdrop-blur-sm py-2">
      <div className="container flex items-center justify-between gap-x-10">
        <div className="flex items-center gap-5">
          <Link href="/">
            <h2 className="font-bold text-2xl">roygbiv</h2>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/convert" />}
                  className={navigationMenuTriggerStyle()}
                >
                  Convert Colors
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
