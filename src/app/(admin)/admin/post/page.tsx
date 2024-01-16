import ButtonComponent from "@/components/ButtonComponent";
import CompetitionCardAdminComponent from "@/components/CompetitionCardAdminComponent";
import React from "react";
import DeleteBtn from "./deleteBtn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";
import PostItemAdmin from "./PostItemAdmin";
async function ResultsPage() {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${process.env.BASE_URL}/api/admin/post?roleId=${JSON.parse(session!.user.adminRole).id}`, {
    cache: "no-store",
  });
  const datas: any[] = await res.json(); 
  const resType = await fetch(`${process.env.BASE_URL}/api/superadmin/posttype`, {
    cache: "no-store",
  });
  const datasType: any[] = await resType.json();
  return (
    <div className="flex flex-col">
      
      <div className="flex items-center gap-3 pb-2 mb-8 border-b-2 ">
        <div className="flex-1">Liste des publication</div>
        <ButtonComponent
          href="/admin/post/create"
          label="Ajouter"
          className="max-w-[200px] ml-4"
        />
      </div>

 

      <div className="grid w-full gap-5 xl:grid-cols-2 ">
        


      {datas.map((data) => (
           <PostItemAdmin data={data} />
        ))}
       {/*  {datas.map((data) => (
          <div
            key={data.id}
           
            className="flex flex-col w-full gap-1 p-2 border rounded-md "
          >
            <div className="text-md">{data.title}</div>
            <div className="text-base opacity-60">
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
        ))} */}
      </div>  
    </div>
  );
}

export default ResultsPage;
 
