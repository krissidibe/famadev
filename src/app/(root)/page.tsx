import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import React from "react";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";

function MarketingPages() {
  return (
    <div className="flex flex-col min-h-full ">
      <div className="flex flex-col items-center justify-center flex-1 px-6 pb-10 text-center md:justify-start gap-y-8 ">
        <Heading />
      </div>
        <Heroes />
      <Footer/>
    </div>
  );
}

export default MarketingPages;
