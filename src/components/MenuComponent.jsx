"use client";
import React, { useState } from "react";
import { XCircleIcon, Bars4Icon } from "@heroicons/react/24/solid";
 
import { FaBeer } from 'react-icons/fa';
import SideBarUser from "./SideBarUser";
function MenuComponent() {
  const [showMenu, setshowMenu] = useState(false);
  return (
    <div className="flex items-center bg-gray-100">
      <div
        onClick={() => {
          setshowMenu((x) => (x = !x));
        }}
        className="absolute bg-gray-100 cursor-pointer hover:text-blue-500 group left-10"
      >
        {!showMenu && (
          <Bars4Icon
            className={`w-8 h-8 md:hidden text-gray-500 group-hover:text-blue-500 transition-all ease-in-out  hover:text-blue-500 hover:scale-110 `}
          />
        )}
      </div>
      {showMenu && (
        <div className="absolute inset-0 z-10 flex flex-col bg-gray-100">
          {showMenu && (
            <XCircleIcon
              onClick={() => {
                setshowMenu((x) => (x = !x));
              }}
              className={`w-10 h-10 self-end  md:hidden text-gray-500  mr-4 mt-4 group-hover:text-blue-500 transition-all ease-in-out  hover:text-blue-500 hover:scale-110 `}
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
