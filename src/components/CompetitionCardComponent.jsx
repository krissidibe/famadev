"use client"

import React,{useState,useEffect} from "react";
import { ArrowRightCircleIcon} from '@heroicons/react/24/solid'
import Link from 'next/link'
import {   convertFromRaw,convertToRaw } from "draft-js";
import parse from 'html-react-parser'; 
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
function CompetitionCardComponent({imageUrl,data}) {
 //console.log(JSON.parse(data.content).blocks);
const router = useRouter();
 const statutData = [
  { name: "Brouillon", code: "0", color:"text-black" },
  { name: "Ouvert", code: "1", color:"text-green-500" },
  { name: "Fermé", code: "2", color:"text-orange-500" },
  { name: "Suspendu", code: "3", color:"text-red-500" },
];


  return (
    <div  onClick={()=>{
      router.push(`/user/competitions/${data.id}`)
    }}       className="flex flex-col cursor-pointer rounded-lg   h-[360px] shadow-md mr-4 mt-4 ">
      <div className="w-full bg-white border rounded-t-lg h-1/2 ">
        
     <picture>
     <img src={imageUrl} alt="image" className="object-contain w-full h-full rounded-t-lg" />
     </picture>
      </div>
       
    <div className="flex items-center justify-between ">
    <span className="self-start text-[15px] line-clamp-1 font-semibold px-4 pt-2 text-black flex-1">{data.title}</span>
        <span className={`self-end text-[12px] px-4 pt-2 mb-2  ${statutData[data.statut].color} `}>{statutData[data.statut].name}</span>
    </div>
      <p className="text-[13px] transition-all duration-700   text-gray-500 flex-1 px-4 mb-3  line-clamp-3  ">
       {parse(data.content.toString().substring(0,250))}
      </p>
      <span className="self-end text-[13px] px-4 text-gray-500 font-semibold border-t-2 pl-10 pt-1 mr-0"><span className="font-normal" >Date de fin</span> : {dayjs(data.endDateAt).format("DD/MM/YYYYTHH:mm").replace("T", " ") }</span>
      <span className="self-start text-[12px] px-4 py-1 text-blue-500 flex items-center mb-4">Voir plus  <ArrowRightCircleIcon className="w-6 ml-2"/> </span>
    </div>
  );
}

export default CompetitionCardComponent;
