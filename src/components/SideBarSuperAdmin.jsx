"use client";
import React, { useState, useEffect } from "react";
 
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { ActivityIcon } from "lucide-react";
const SideBarSuperAdmin = ({ show = true, handleClick = () => {
  useRouter().refresh();

} }) => { 
  const [canClose, setCanClose] = useState(true);
  const session = useSession();
  const router = useRouter();
 

  const toogleClose = () => {
    setCanClose((x) => (x = !x));
  };

  //  alert()
  return (
    <div className={`bg-[#052703] md:w-[260px] w-full ${canClose  ? "" : "hidden"} md:flex  flex flex-col h-screen transition-all ease-in-out p-4 `}>
     
     <div className="flex items-center justify-center w-auto mt-10 space-x-4 ">
        <Image
          src="/images/logo_fama.png"
          alt="me"
          className="cursor-pointer rounded-xl "
          width={120}
          height={120}
        />
        
      </div>
      
      <div className="flex flex-col mt-[30px] flex-1   ">
        <NavItem
          key={1}
          handleClick={handleClick}
          name="Liste des admins"
          href="/superadmin"
          Icon={HomeIcon}
        />
        <NavItem
          key={2}
          handleClick={handleClick}
          name="Roles"
          href="/superadmin/role"
          Icon={ActivityIcon}
        />
        <NavItem
          key={3}
          handleClick={handleClick}
          name="Créer un admin"
          href="/superadmin/profile"
          Icon={BookOpenIcon}
        />
       {/*  <NavItem
          key={2}
          handleClick={handleClick}
          name="Candidatures"
          href="/superadmin/candidatures"
          Icon={BookOpenIcon}
        /> */}
 
      </div>
      <NavItem
        key={5}
        name="Deconnexion"
        
        handleClick={() => signOut()}
        Icon={ArrowLeftIcon}
        className="mb-20"
      />
   {/*    <button   onClick={() => signOut()}>Deconnexion </button> */}
    </div>
  );
};

 

export default SideBarSuperAdmin;
function NavItem({ name, href = "", Icon, className = "", handleClick }) {
  const router = usePathname();

  if (router == "/user") {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={`flex py-3 px-4 mb-4 space-x-2 ${
          router.includes(href) ? "bg-white" : ""
        }  cursor-pointer rounded-xl group transition-all ease-in-out ${className}`}
      >
        <Icon
          className={`w-6 h-6  group-hover:text-blue-500 transition-all ease-in-out ${
            router.includes(href) ? "text-blue-500" : "text-white"
          }`}
        />
        <p
          className={`text-[16px]  group-hover:text-blue-500 transition-all ease-in-out ${
            router.includes(href) ? "text-blue-500" : "text-white"
          }`}
        >
          {name}
        </p>
      </Link>
    );
  } else {
    return (
      <Link
      href={href}
      onClick={handleClick}
      className={`flex py-3 px-4 mb-4 space-x-2 ${
        router.includes(href.split("/")[2]) ? "bg-white" : ""
      }  cursor-pointer rounded-xl group transition-all ease-in-out ${className}`}
    >
      <Icon
        className={`w-6 h-6    transition-all ease-in-out ${
          router.includes(href.split("/")[2])
            ? "text-[#123610]"
            : "text-white"
        }`}
      />
      <p
        className={`text-[16px]    transition-all ease-in-out ${
          router.includes(href.split("/")[2])
            ? "text-[#123610]"
            : "text-white"
        }`}
      >
        {name}
      </p>
    </Link>
    );
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={`flex py-3 px-4 mb-4 space-x-2 ${
          router.includes(href.split("/")[2]) ? "bg-white" : ""
        }  cursor-pointer rounded-xl group transition-all ease-in-out ${className}`}
      >
        <Icon
          className={`w-6 h-6  group-hover:text-blue-500 transition-all ease-in-out ${
            router.includes(href.split("/")[2])
              ? "text-blue-500"
              : "text-gray-500"
          }`}
        />
        <p
          className={`text-[16px]  group-hover:text-blue-500 transition-all ease-in-out ${
            router.includes(href.split("/")[2])
              ? "text-blue-500"
              : "text-gray-500"
          }`}
        >
          {name}
        </p>
      </Link>
    );
  }
}
