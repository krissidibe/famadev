import React  from "react";
import CompetitionCardComponent from "../../../../components/CompetitionCardComponent";
import {prisma} from '../../../../utils/prisma'
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
 
import SearchComponent from "./SearchComponent";
export const dynamic = "force-dynamic"

type Competition = {
  id: string;
 
};


async function Competitions() {
 // const [search, setSearch] = useState("")
 const res = await fetch(`${process.env.BASE_URL}/api/user/competition`,{
  cache:"no-store"
 })
 const datas: any[] = await res.json();
 
  return (
    <div className="flex flex-col">
     <SearchComponent/>

      <div className="flex flex-col flex-wrap items-center w-full md:flex-row ">
 
      <div className="grid items-center w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:flex-row">
       {datas.map((data) => (
           
           <CompetitionCardComponent
           key={data.id}
           data={data}
           imageUrl={`${process.env.BASE_URL}${data.image}`}
         /> 
    ))}  
    </div>
      </div>
    </div>
  );
}

export default Competitions;
