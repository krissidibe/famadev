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
const SideBarUser = ({ show = true, handleClick = () => {
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
    <div
      className={`bg-[#274472] text-white  md:w-[260px] w-full ${
        canClose ? "" : "hidden"
      } md:flex  flex flex-col h-screen transition-all ease-in-out px-4 `}
    >
        <Image
            src="/images/Dnajml.png"
            alt="me"
            className="absolute top-0 left-0"
            width="64"
            height="64"
          />
      <div className="md:min-w-[450px] w-[353px] text-white items-center justify-between my-4 flex space-x-2">
        <div className="flex items-center pl-10 space-x-4">
          {/* <Image
            src="/images/logo.png"
            alt="me"
            className=" left-20"
            width="40"
            height="40"
          /> */}
        <div className="flex flex-col">
        <div className="text-xl border-b-2 border-white"><p>DNAJ</p></div>
          <div className="text-xl font-bold text-[#50a1ef]"><p>CONCOURS</p></div>
        </div>

        
        </div>
        {show && (
          <XCircleIcon
            onClick={toogleClose}
            className={`cursor-pointer w-6 h-6 md:hidden self text-gray-500 group-hover:text-blue-500 transition-all ease-in-out hover:text-blue-500 hover:scale-110 `}
          />
        )}
      </div>
      <div className="flex flex-col mt-[30px] flex-1   ">
        <NavItem
          key={1}
          handleClick={handleClick}
          name="Tableau de bord"
          href="/user"
          Icon={HomeIcon}
        />
        <NavItem
          key={2}
          handleClick={handleClick}
          name="Concours"
          href="/user/competitions"
          Icon={BookOpenIcon}
        />
        <NavItem
          key={3}
          handleClick={handleClick}
          name="Candidatures"
          href="/user/candidatures"
          Icon={AcademicCapIcon}
        />
        <NavItem
          key={4}
          handleClick={handleClick}
          name="Profile"
          href="/user/profile"
          Icon={UserIcon}
        />
      </div>
      <p className="mb-20 text-sm">
          CONTACTS : 0023 76 16 49 33 / 67 04 44 85
          </p>
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

SideBarUser.propTypes = {};

export default SideBarUser;
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
          className={`w-6 h-6  group-hover:text-blue-500 transition-all ease-in-out ${
            router.includes(href.split("/")[2])
              ? "text-blue-500"
              : "text-white"
          }`}
        />
        <p
          className={`text-[16px]  group-hover:text-blue-500 transition-all ease-in-out ${
            router.includes(href.split("/")[2])
              ? "text-blue-500"
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
