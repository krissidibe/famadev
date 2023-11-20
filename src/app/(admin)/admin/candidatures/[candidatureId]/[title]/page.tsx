import React from "react"; 
import DataUserAdminCandidatureComponent from "../../../../../../components/DataUserAdminCandidatureComponent";
 
export const dynamic = "force-dynamic"
async function page({
  params,
}: {
  params: {
    candidatureId: string;
    title: string;
  };
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/admin/competition?id=${params.candidatureId}&candidature=true`,
    { cache:"no-store" }
  );
  const datas: any[] = await res.json();
 
  return (
    <div className="flex flex-col flex-1 w-full ">
   
    
    <p className="text-xl font-bold">L'intitulé du concours : {decodeURI(params.title)}</p>
 
    <DataUserAdminCandidatureComponent datas={datas} /> 
    </div>
  );
}

export default page;
