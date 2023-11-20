"use client"
import React ,{useState} from "react";
import CompetitionCardComponent from "../../../../components/CompetitionCardComponent";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import CompetitionList from "./CompetitionList";

function SearchComponent() {
    const [search, setSearch] = useState("")
  return (
    <div className="flex flex-col pb-2 mb-8 border-b-2 md:items-center md:flex-row ">
      <p className="flex-1 ">Liste des concours</p>{" "}
      <div className="flex px-4 bg-gray-100 rounded-md md:w-[310px]">
        <input
            value={search}
          onChange={(e)=> setSearch(e.target.value)} 
          className="w-full p-1 px-3   h-[45px] bg-gray-100  outline-none"
          placeholder="Rechercher"
        />
       {
        search.length >=3 &&  <Link className="flex items-center justify-center cursor-pointer" href={`/user/competitions/search/${search}`}>
        <MagnifyingGlassIcon className="w-6 text-black " />
      </Link>
       }
      </div>
    </div>
  );
}

export default SearchComponent;
