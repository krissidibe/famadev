import { FunctionComponent } from "react";
import { Board } from "../../../../../typings";
 import {prisma} from '../../../../utils/prisma'
import CompetitionCardComponent from "@/components/CompetitionCardComponent";
import Link from "next/link";

const CompetitionList = async () => {
 
  const res = await fetch(`${process.env.BASE_URL}/api/admin/competition`,{next:{revalidate:0}})
  const datas: any[] = await res.json();
  return (
    
    
     <div className="grid items-center w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:flex-row">
       {datas.map((data) => (
      <Link  key={data.id} href={`/user/competitions/${data.id}`}>
           {/*  @ts-ignore */}
        <CompetitionCardComponent
          key={data.id}
          data={data}
          imageUrl={`https://picsum.photos/300/200?random=${data.id}`}
        />
      </Link>
    ))}  
    </div>
    
    
  );
};

export default CompetitionList;
