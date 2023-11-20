
import React from "react";
import { prisma } from "../../../../../utils/prisma";
import CompetitionCardComponent from "@/components/CompetitionCardComponent";
import Link from "next/link";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import ButtonComponent from "../../../../../components/ButtonComponent";
export default async function CompetitionItem({
  params,
}: {
  params: { competitionId: string };
}) {
  const data = await prisma.competition.findFirst({
    where: {
      id: params.competitionId,
    },
  });

  const statutData = [
    { name: "Brouillon", code: "0", color:"text-black" },
    { name: "Ouvert", code: "1", color:"text-green-500" },
    { name: "Fermé", code: "2", color:"text-orange-500" },
    { name: "Suspendu", code: "3", color:"text-red-500" },
  ];
  
  if (!data) {
    return notFound();
  }

  return (
    <div className="flex flex-col">
      <div className="w-full mb-6 rounded-lg h-1/2 bg-slate-600 ">
        <picture>
          <img
            src={`https://picsum.photos/300/200?random=${data.id}`}
            alt="image"
            className="object-contain w-full max-h-[310px] md:max-h-[410px]  rounded-lg"
          />
        </picture>
      </div>
      <h1 className="w-full pb-2 mb-4 border-b-2">{data?.title}</h1>
      <div className="flex flex-col items-center p-4 mb-4 rounded-lg md:items-end bg-slate-100">
      <span className={`text-[14px]  text-gray-500  ${statutData[parseInt(data.statut)].color}  `}>
          Etat du concours :   {statutData[parseInt(data.statut)].name}
        </span>
        <span className="text-[14px]  text-gray-500   ">
          Date : du {new Date(data.startDateAt).toLocaleDateString("fr-FR")} au{" "}
          {new Date(data.endDateAt).toLocaleDateString("fr-FR")}
        </span>
        <span className="text-[14px]  text-gray-500  ">
          L'age est comprise entre : {data.ageMin} ans et {data.ageMax} ans
        </span>
      </div>
      <p className="text-[14px] text-gray-500">{parse(data?.content || "")}</p>
      <div className="flex items-end justify-end w-full my-4">
       {/*  {new Date(data.endDateAt) && (
          <ButtonComponent
            key={4}
            label="Postuler"
            className="md:w-[120px]"
            href={`/user/competitions/${data.id}/apply/?id=${data.id}`}
            full={true}
          />
        )} */}
        
      </div>
 
    </div>
  );
}
