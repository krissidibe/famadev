"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowRight, LogIn, LogInIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthentificated, setIsAuthentificated] = useState(true);
  return (
    <div
      className={cn(
        "z-50 bg-background  top-0 justify-between flex items-center   p-6 py-4 border-b shadow-sm"
      )}
    >
     <Link href="/" >
     <p className="font-bold">FAMAMALI</p>
     </Link>
     <div className="flex items-center justify-center">
         
        {isAuthentificated && (
         <Avatar className="w-8 h-8 rounded-full cursor-pointer " > 
         <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
         <AvatarFallback>CN</AvatarFallback>
       </Avatar>
        )}
      </div>
     
    </div>
  );
}

export default Navbar;
