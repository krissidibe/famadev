import { Button } from '@/components/ui/button'
import React from 'react'
import AddRole from './AddRole'
import AdminProfileComponent from '../AdminProfileComponent';
export const dynamic = "force-dynamic"
async function page() {
  const res = await fetch(`${process.env.BASE_URL}/api/superadmin/role`, {
    cache: "no-store",
  });
  const datas: any[] = await res.json();
  return (
    <div className='flex flex-col overflow-y-scroll'>
       <div className='flex items-center justify-between w-full pb-4 border-b'>
       <p>Liste des roles</p>
   <AddRole/>
       </div>
       <div className="flex flex-col flex-wrap flex-1 gap-4 pt-4 overflow-y-scroll cursor-pointer md:grid-cols-2 xl:grid-cols-3 md:grid ">
        {
          datas.map((item)=> (

            <div className='flex flex-col w-full p-4 rounded-md bg-black/5' key={item.id}  >
              <p className='font-bold'> {item.name}</p>
            <p className='text-xs opacity-50'>  {item.content}</p>
            </div>
          ))
        }
        
    </div>
    </div>
  )
}

export default page