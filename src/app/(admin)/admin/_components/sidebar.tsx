"use client";
import { Button } from "@/components/ui/button";
import {
  BookIcon,
  ChevronDown,
  HomeIcon,
  ListIcon,
  LogOut,
  LogOutIcon,
  LucideIcon,
  LucideProps,
  PlusCircle,
  PlusCircleIcon,
  User2,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export default function Sidebar() {
  return (
    <div className="bg-gray-100 w-72 flex flex-col border-r ">
      <div className="p-5 border-b">
        <p> Logo</p>
      </div>

      <div className="flex gap-4 flex-col pt-10 px-2   flex-1">
        <MenuItem href="/admin" icon={<HomeIcon />} name="Acceuil" />
        <MenuItem
          href="/admin/competitions/create"
          icon={<BookIcon />}
          asChild
          name="Concours"
        >
          <Link
            href="/admin/competitions/create"
            className="hover:bg-white/80 rounded-md p-2 pl-4 opacity-80 hover:opacity-100  flex items-center  gap-2 "
          >
            {" "}
            <PlusCircleIcon className="w-5 h-5" /> Ajouter
          </Link>
          <Link
            href="/"
            className="hover:bg-white/80 rounded-md p-2 pl-4 opacity-80 hover:opacity-100  flex items-center  gap-2 "
          >
            {" "}
            <ListIcon className="w-5 h-5" /> Liste
          </Link>
        </MenuItem>

        <MenuItem href="/admin/candidatures" icon={<User2Icon />} name="Candidature" />
      </div>
      <div className="px-2 pb-10">
        <Button asChild>
          <Link
            href="/"
            className="w-full    text-sm hover:bg-black/80 rounded-md"
          >
            <div className="flex  gap-3  items-center  ">
              <LogOutIcon />
              Deconnexion 
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );

  function MenuItem({
    name,
    icon,
    href,
    asChild,
    children,
  }: {
    href: string;
    name: string;
    icon: any;
    asChild?: boolean;
    children?: React.ReactNode;
  }) {
    const router = usePathname();
    /*   const handleExpand = (event:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
      event.stopPropagation()
    } */
    /*  */

    const [isOpen, setIsOpen] = useState(false);

    const handleExpand = () => {
      if(asChild){

        setIsOpen((x) => (x = !x));
      }
    };

    if (!asChild) {
      return (
        <Link
          href={href}
          onClick={handleExpand}
          className={cn(
            "w-full relative   cursor-pointer select-none justify-center items-center text-sm",
            (router == href && !isOpen) && "bg-white rounded-md  "
          )}
        >
          <div className="flex p-3 gap-3  hover:bg-white rounded-md  items-center">
            
            {icon}
            {name}
          </div>
        </Link>
      );
    }

    return (
      <div
        onClick={handleExpand}
        className={cn(
          "w-full relative   cursor-pointer select-none justify-center items-center text-sm",
          (router ==  href  && !isOpen) && "bg-white rounded-md  "
        )}
      >
        <div className="flex p-3 gap-3  hover:bg-white rounded-md  items-center  ">
          {icon}
          {name}
          {!!isOpen && (
            <ChevronDown className="absolute right-2 w-4 h-4 opacity-50" />
          )}
        </div>
        {isOpen && (
          <div className="px-3 pt-1 gap-3  text-xs  items-center  ">
            {children}
          </div>
        )}
      </div>
    );
  }
}
