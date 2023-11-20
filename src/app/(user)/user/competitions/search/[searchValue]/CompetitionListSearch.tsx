import React from "react";
import { prisma } from "../../../../../../utils/prisma";
import CompetitionCardComponent from "@/components/CompetitionCardComponent";
 
export default async function CompetitionListSearch({
  params,
}: {
  params: {
    searchValue: string;
  };
}) {
  const value: string = `%${params.searchValue}%` 
  const datas:any []= await prisma.$queryRaw`SELECT * FROM Competition WHERE title LIKE ${value} AND statut IN (1,2) `;
  
   
  return (
    <div className="grid items-center w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:flex-row">

 
    {datas.map((data) => (
       
          <CompetitionCardComponent
            key={data.id}
            data={data}
            imageUrl={`${process.env.BASE_URL}${data.image}`}
          />
          
     
        
      ))} 
    </div>
  );
}
