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
    candidatureId: string;
    
  };
}) {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.BASE_URL}/api/user/candidature?email=${session?.user?.email}&id=${params.candidatureId}`,
    { cache: "no-store" }
  );

  const data: any = await res.json();
  return <div> 
  
  <CandidatureItem data={data} />
  </div>;
}

export default page;
