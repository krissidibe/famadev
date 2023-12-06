import ButtonComponent from "@/components/ButtonComponent";
import CompetitionCardAdminComponent from "@/components/CompetitionCardAdminComponent";
import React from "react";
import DeleteBtn from "./deleteBtn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";
async function ResultsPage() {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${process.env.BASE_URL}/api/admin/result`, {
    cache: "no-store",
  });
  const datas: any[] = await res.json();
  return (
    <div className="flex flex-col">
      
      <div className="flex items-center gap-3 pb-2 mb-8 border-b-2 ">
        <div className="flex-1">Liste des résultats</div>
        <ButtonComponent
          href="/admin/resultats/create"
          label="Ajouter"
          className="max-w-[200px] ml-4"
        />
      </div>

 

      <div className="flex flex-col items-center w-full gap-3 ">
        {datas.map((data) => (
          <div
            key={data.id}
           
            className="flex flex-col w-full gap-1 p-2 border rounded-md "
          >
            <div className="text-sm">{data.title}</div>
            <div className="text-xs opacity-60">
              {data.content}  
            </div>
            <div className="flex self-end gap-3">
            <DeleteBtn id={data.id} />
            <a 
             target="_blank"
             href={`${process.env.BASE_URL}${data.files}`}
            className="p-2 text-xs text-white bg-green-700 rounded-lg opacity-100 cursor-pointer">
            Télécharger{" "}
            
            </a>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;
