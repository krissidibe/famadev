"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function  PostItemUser({data}:{data:any})  {
    const router = useRouter()
    return <div

    onClick={() => {
        router.push(`/user/post/${data.id}`)
    }}
    key={data.id}

    className="flex max-h-[300px] relative overflow-hidden flex-col w-full gap-1 p-2 border rounded-md  cursor-pointer"
  >
    <div className="flex flex-col">
      <div className="px-3 pt-2 text-base font-bold">{data.title}</div>
      <div className="px-3 text-xs ">{data.typeOfPost.name}</div>
    </div>
    <div className="flex-1 p-3 max-h-[190px] pb-2  overflow-hidden text-xs  opacity-60">
      {data.content}
    </div>
    <div className="flex self-end gap-3">

      {/*   <a
           target="_blank"
           href={`${process.env.BASE_URL}${data.files}`}
          className="p-2 px-4 text-xs text-white bg-green-700 rounded-lg opacity-100 cursor-pointer">
          Télécharger{" "}
          
          </a>
           */}
    </div>
  </div>;
}

export default PostItemUser