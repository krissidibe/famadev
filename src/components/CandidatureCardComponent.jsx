"use client"

import React,{useState,useEffect} from "react";
import { ArrowRightCircleIcon} from '@heroicons/react/24/solid'
import Link from 'next/link'
import {   convertFromRaw,convertToRaw } from "draft-js";
import parse from 'html-react-parser'; 
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
function CandidatureCardComponent({imageUrl, data}) {
 //console.log(JSON.parse(data.content).blocks);
const router = useRouter();
 const statutData = [
  { name: "Brouillon", code: "0", color:"text-black" },
  { name: "Ouvert", code: "1", color:"text-green-500" },
  { name: "Fermé", code: "2", color:"text-orange-500" },
  { name: "Suspendu", code: "3", color:"text-red-500" },
];

/* 
  return (
    <div>{JSON.stringify(data)}</div>
  ) */
  return (
    <div  onClick={()=>{
      router.push(`/admin/candidatures/${data.id}/${data.title}`,{datas:data})
    }}   passHref legacyBehavior className="flex flex-col cursor-pointer rounded-lg   h-[558px] shadow-md mr-4 mt-4 ">
      <div className="w-full bg-white rounded-t-lg h-1/2 ">
        
     <picture>
      
     <img  src="/images/people.png" alt="image" className="object-cover w-full h-full rounded-t-lg" />
     </picture>
      </div>
       
    <div className="flex items-center justify-between ">
    <span className="self-start text-[15px] line-clamp-1 font-semibold px-4 pt-2 text-black flex-1">{data.title}</span>
        <span className={`self-end text-[12px] px-4 pt-2 mb-2  ${statutData[data.statut].color} `}>{statutData[data.statut].name}</span>
    </div>
      <div className="text-[13px] transition-all duration-700   text-gray-500 flex-1 px-4 mb-3  line-clamp-4  ">
       {parse(data.content)}
      </div>
      <span className="self-end text-[13px] px-4 text-gray-500 font-semibold border-t-2 pl-10  mr-0"><span className="font-normal" >Date de fin</span> : {dayjs(data.endDateAt).format("DD/MM/YYYYTHH:mm").replace("T", " ") }</span>
    
    <div className=" px-4 py-2 my-2 bg-slate-100 border-[1px] rounded-md border-black text-[13px] ml-4 mr-4">
    <div className="flex justify-between px-2 py-4 rounded-sm" >  
 
   
    
    <p className="font-bold">Nombre de candidature total</p> <p className="font-semibold">{data.candidatures.filter(item=> item.statut != "100" ).length}</p> </div>
   {/*  <div className="flex justify-between border-b-[1px] border-black rounded-sm" >  <p className="">Nombre de candidature validée</p> <p className="text-green-500">650</p> </div>
    <div className="flex justify-between rounded-sm " >  <p className="">Nombre de candidature en cours</p> <p className="text-orange-500">150</p> </div> */}
    </div>
    
      <span className="self-start text-[12px] px-4 py-1 text-blue-500 flex items-center mb-4">Voir plus  <ArrowRightCircleIcon className="w-6 ml-2"/> </span>
    </div>
  );
}

export default CandidatureCardComponent;
