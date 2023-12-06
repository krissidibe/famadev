 
import React from "react"; 
import CandidatureCardComponent from "@/components/CandidatureCardComponent"; 
export const dynamic = "force-dynamic"
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth/next";
async function Competition() {

  const session = await getServerSession(authOptions)
  const adminRole  = JSON.parse(session!.user.adminRole)
 const res = await fetch(`${process.env.BASE_URL}/api/admin/role?id=${adminRole.id}`, {
  cache:"no-store",
  next:{revalidate:0}
  });
  const datas = await res.json(); 
  const competitions  = datas.competition

 
 
  return (
    <div className="flex flex-col">
      <div className="flex items-center pb-2 mb-8 border-b-2 ">
        <div className="flex-1">Liste des candidatures par concours</div>{" "}
        <div className="flex px-4 bg-gray-100 rounded-md md:w-[310px]">
          <input
            className="w-full p-1 px-3   h-[45px] bg-gray-100  outline-none"
            placeholder="Rechercher"
          />
        </div>
      </div>

      <div className="grid items-center w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:flex-row">
        {competitions.map((data:any) => (
          
            <CandidatureCardComponent
              key={data.id}
              data={data}
              imageUrl={`${process.env.BASE_URL}${data.image}`}
            />
 
        ))}
      </div>
    </div>
  );
}

export default Competition;
