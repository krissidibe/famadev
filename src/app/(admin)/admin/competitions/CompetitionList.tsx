import { FunctionComponent } from "react";
import { Board } from "../../../../../typings";
 import {prisma} from '../../../../utils/prisma'
import CompetitionCardAdminComponent from "@/components/CompetitionCardAdminComponent";
import Link from "next/link";
 
export const revalidate = 0;
const CompetitionList = async () => {
/*   const datas = await prisma.competition.findMany({

  }) */
  const res = await fetch(`${process.env.BASE_URL}/api/admin/competition`,{next:{revalidate:0}})
  const datas: any[] = await res.json();
  return (
    
    /* href={`/admin/competitions/${data.id}`} */
     <div className="grid items-center w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:flex-row">
     
       {datas.map((data) => (
      <div  key={data.id} >
{/*            @ts-ignore   */}
        <CompetitionCardAdminComponent
          key={data.id}
          data={data}
          imageUrl={`https://picsum.photos/300/200?random=${data.id}`}
        />
      </div>
    ))}  
    </div>
    
    
  );
};

export default CompetitionList;
