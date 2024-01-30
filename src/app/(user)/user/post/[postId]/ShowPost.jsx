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
      <div className="px-3 text-xs ">{data.typeOfPost.name}</div>
    </div>
    <div className="flex-1 p-3 pb-2 overflow-hidden text-xs opacity-60">
      {data.content}
    </div>

    {JSON.parse(data.files).length > 0 && JSON.parse(data.files).map((result) => (<div className="flex items-center space-x-4">
        <div className="flex items-center flex-1 mt-2 cursor-pointer justify-end p-4 h-[38px] border-[1px] rounded-sm">
          
          <a
            target="_blank"
            href={`${process.env.BASE_URL}${result}`}
            className="flex items-center justify-between flex-1 space-x-2 text-xs"
            >
            {result.replace("/files/","").substring(0, result.length-36)}
            <p className="text-sm">Télécharger </p>
         {/*    <FaDownload className="h-12 mr-4" /> */}
          </a>
        </div>
      </div>)
        
     
      )}
    
  </div>;
}

export default ShowPost