import ButtonComponent from "../../../../../components/ButtonComponent";
import InputComponent from "../../../../../components/InputComponent";
import { XCircleIcon } from "@heroicons/react/24/solid";
import CompetitionItem from "./CompetitionItem";
import { Suspense } from "react";
 import {prisma} from '../../../../../utils/prisma'
async function ShowCompetition({params}:{
  params:{
    competitionId: string
  }
}) {
 // const [visible, setVisible] = useState(false);
/*  const data = await prisma.competition.findFirst({
  where:{
    id: params.competitionId
  }
 })

 */


 const res = await fetch(`${process.env.BASE_URL}/api/admin/competition?id=${params.competitionId}`, {
  cache:"no-store",
  next:{revalidate:0}
  });
  const data = await res.json(); 


  return (
    <div className="flex flex-col">
     
    
  <CompetitionItem  params={params} data={data}  />
 
    </div>

  );
}

export default ShowCompetition;
