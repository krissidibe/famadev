"use client"
import { TrashIcon } from 'lucide-react';
import React from 'react'
import { useRouter } from 'next/navigation'
function ItemRejet({item}: {item:any}) {
    const router = useRouter()
  return (
    <div className='relative flex flex-col w-full p-4 rounded-md group bg-black/5'  >
    <p className='font-normal'> {item.name}</p>
    <div
    onClick={async()=>{
      const res = await fetch(`${process.env.BASE_URL}/api/superadmin/posttype?id=${item.id}`, {
          cache: "no-store",
        method:"DELETE", 
      },
        );
        const datas: any = await res.json();
       if(datas){
        router.refresh()
       }
        
    }}
    className="absolute hidden p-1 bg-black rounded-full cursor-pointer group-hover:flex right-4 top-4">

   <TrashIcon className='w-4 h-4 text-white '  />
    </div>
  </div>
  )
}

export default ItemRejet