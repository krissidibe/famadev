import React from "react";

import { usePathname, useSearchParams } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import CandidatureItem from "./CandidatureItem";
export const dynamic = "force-dynamic";
async function page({
  params,
}: {
  params: {
 
    applyId: string;
    
  };
}) {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.BASE_URL}/api/admin/candidature?id=${params.applyId}`,
    { cache: "no-store" }
  );

  const data: any = await res.json();
  return <div> 
   
 
  <CandidatureItem datas={data} /> 
  </div>;
}

export default page;
