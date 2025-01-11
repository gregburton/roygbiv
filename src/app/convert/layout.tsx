import type { Metadata } from "next";

import Sidebar from "@/components/convert/Sidebar";

export const metadata: Metadata = {
  title: "Convert Colors | roygbiv",
  description: "Convert all manner of colors",
};

export default async function ConvertLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <aside>
        <Sidebar />
      </aside>
      <section className="w-full">{children}</section>
    </div>
  );
}
