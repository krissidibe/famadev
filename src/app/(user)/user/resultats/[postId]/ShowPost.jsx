"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function  ShowPost({data})  {
    const router = useRouter()
    return <div

    
    key={data.id}

    className="relative flex flex-col w-full gap-1 p-2 overflow-hidden border rounded-md cursor-pointer"
  >
    <div className="flex flex-col">
      <div className="px-3 pt-2 text-base font-bold">{data.title}</div>
      
    </div>
    <div className="flex-1 p-3 pb-2 overflow-hidden text-xs opacity-60">
      {data.content}
    </div>
    <div className="flex self-end gap-3">

         {(data.files != null && data.files != "bad")&& <a
           target="_blank"
           href={`${process.env.BASE_URL}${data.files}`}
          className="p-2 px-4 text-xs text-white bg-green-700 rounded-lg opacity-100 cursor-pointer">
          Télécharger{" "}
          
          </a>}
           
    </div>
  </div>;
}

export default ShowPost