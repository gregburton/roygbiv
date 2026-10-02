"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import convertLinks from "@/lib/convert-links";

const ConverterSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Converter Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {convertLinks.map((link) => (
                <SidebarMenuItem key={link.label}>
                  <SidebarMenuButton
                    isActive={pathname === link.url}
                    render={
                      <Link href={link.url}>
                        <span>{link.label}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ConverterSidebar;
