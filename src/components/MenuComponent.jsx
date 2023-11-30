"use client";
import React, { useState } from "react";
import { XCircleIcon, Bars4Icon } from "@heroicons/react/24/solid";
 
import { FaBeer } from 'react-icons/fa';
import SideBarUser from "./SideBarUser";
import { MenuIcon, XIcon } from "lucide-react";
function MenuComponent() {
  const [showMenu, setshowMenu] = useState(false);
  return (
    <div className="flex items-center bg-[#052703] ">
      <div
        onClick={() => {
          setshowMenu((x) => (x = !x));
        }}
        className="absolute bg-[#052703] cursor-pointer hover:text-blue-500 group left-10"
      >
        {!showMenu && (
          <MenuIcon
            className={`w-8 h-8 md:hidden -left-7 top-4 absolute   bg-[#0C4304]  group-hover:text-white transition-all ease-in-out  hover:text-blue-500 hover:scale-110 `}
          />
        )}
      </div>
      {showMenu && (
        <div className="absolute inset-0 z-10 flex flex-col h-screen  top-0 mt-0 bg-[#052703]  ">
          {showMenu && (
            <XIcon
              onClick={() => {
                setshowMenu((x) => (x = !x));
              }}
              className={`w-10 h-10 self-end cursor-pointer  flex  md:hidden text-gray-500  mr-4 mt-4 group-hover:text-white transition-all ease-in-out  hover:text-white hover:scale-110 `}
            />
          )}
          <SideBarUser
            show={false}
            handleClick={() => setshowMenu((x) => (x = false))}
          />
        </div>
      )}
    </div>
  );
}

export default MenuComponent;
