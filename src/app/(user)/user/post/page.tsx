import ButtonComponent from "@/components/ButtonComponent";
import CompetitionCardAdminComponent from "@/components/CompetitionCardAdminComponent";
import React from "react";
import DeleteBtn from "./deleteBtn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";
import PostItemUser from "./PostItemUser";
async function ResultsPage() {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${process.env.BASE_URL}/api/user/post`, {
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
        
      </div>

 

      <div className="grid w-full gap-5 xl:grid-cols-2 ">
        
        {datas.map((data) => (
        <PostItemUser data={data} />
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;
