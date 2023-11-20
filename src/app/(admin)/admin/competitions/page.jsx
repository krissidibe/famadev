import ButtonComponent from "@/components/ButtonComponent";
import CompetitionCardAdminComponent from "@/components/CompetitionCardAdminComponent";
import MagnifyingGlassIcon from "@/components/ButtonComponent";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import {prisma} from '../../../../utils/prisma'
export const dynamic = 'force-dynamic'
async function getCompetition() {
 
  const res = await fetch(`${process.env.BASE_URL}/api/admin/competition`, {
 cache:"no-store",
 next:{revalidate:0}
  });
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
 
 

 
}
 async function Competition() {

 const res = await fetch(`${process.env.BASE_URL}/api/admin/competition`, {
  cache:"no-store",
  next:{revalidate:0}
  });
  const datas = await res.json(); 
 
  return (
    <div className="flex flex-col">
      <div className="flex items-center pb-2 mb-8 border-b-2 ">
        <div className="flex-1">Liste des concours</div>{" "}
        <div className="flex px-4 bg-gray-100 rounded-md md:w-[310px]">
          <input
            className="w-full p-1 px-3   h-[45px] bg-gray-100  outline-none"
            placeholder="Rechercher"
          />
        </div>
        <ButtonComponent
          href="/admin/competitions/create"
          label="Ajouter"
          className="max-w-[200px] ml-4"
        />
      </div>

      <div className="grid items-center w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:flex-row">
   
    
     {datas.map((data) => (
          <div key={data.id}>
            <CompetitionCardAdminComponent
              key={data.id}
              data={data}
              imageUrl={`${process.env.BASE_URL}${data.image}`}
            />
          </div>
        ))} 
      </div>
    </div>
  );
}

export default Competition;
