import ButtonComponent from "@/components/ButtonComponent";
import CompetitionCardAdminComponent from "@/components/CompetitionCardAdminComponent";
import React from "react";

async function ResultsPage() {
  const res = await fetch(`${process.env.BASE_URL}/api/user/result`, {
    cache: "no-store",
  });
  const datas: any[] = await res.json();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 pb-2 mb-8 border-b-2 ">
        <div className="flex-1">Liste des résultats</div> 
       
      </div>

      {/* 
        <a
            target="_blank"
            href={`${process.env.BASE_URL}${result}`}
            className="flex items-center justify-between flex-1 space-x-2"
          >
            <p className="text-sm">Télécharger </p>
            <FaDownload className="h-12 mr-4" />
          </a>
      */}

      <div className="flex flex-col items-center w-full gap-3 ">
        {datas.map((data) => (
          <a
            key={data.id}
            target="_blank"
             href={`${process.env.BASE_URL}${data.files}`}
            className="flex flex-col w-full gap-1 p-2 border rounded-md "
          >
            <div className="text-sm">{data.title}</div>
            <div className="text-xs opacity-60">
              {data.content}  
            </div>
            <div className="flex self-end gap-3">
            
            <a 
            
            className="p-2 text-xs text-white bg-green-700 rounded-lg opacity-100 cursor-pointer">
            Télécharger{" "}
            
            </a>
            
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;
