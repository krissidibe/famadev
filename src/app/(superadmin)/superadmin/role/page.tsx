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
    <div className='flex flex-col'>
       <div className='flex items-center justify-center justify-between w-full pb-4 border-b'>
       <p>Liste des roles</p>
   <AddRole/>
       </div>
       <div className="flex flex-wrap gap-4">
        {
          datas.map((item)=> (

            <div key={item.id}  >
              {item.name}
            </div>
          ))
        }
        
    </div>
    </div>
  )
}

export default page