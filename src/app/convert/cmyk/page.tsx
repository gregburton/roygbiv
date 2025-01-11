"use client";

import { useColorStore } from "@/store";
import ConvertCmykForm from "@/components/forms/ConvertCmykForm";
import CmykCard from "@/components/convert/CmykCard";
import { SidebarTrigger } from "@/components/ui/sidebar";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";

const ConvertCmykPage = () => {
  const submittedColors = useColorStore((state) => state.submittedColors);
  const colors = getColorsByFormat(submittedColors, "cmyk");
  return (
    <main className="container mt-5 mb-10">
      <div className="mb-5 flex items-center gap-x-5">
        <SidebarTrigger />
        <h1 className="text-2xl">Convert a CMYK value</h1>
      </div>

      <ConvertCmykForm />

      {colors && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Recently Converted</h2>
          <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {colors.split("__").map((c) => (
              <li key={c}>
                <CmykCard color={c} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default ConvertCmykPage;
