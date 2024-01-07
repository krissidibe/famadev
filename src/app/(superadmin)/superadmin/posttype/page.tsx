import React from 'react'
import Form from './form'
import { TrashIcon } from 'lucide-react';
import ItemRejet from './ItemRejet';
export const dynamic = "force-dynamic"
async function page() {
    const res = await fetch(`${process.env.BASE_URL}/api/superadmin/posttype`, {
        cache: "no-store",
      });
     const datas: any[] = await res.json();
  return (
    <div>
        <Form/>


       

      <div className="flex flex-col flex-wrap flex-1 gap-4 pt-4 overflow-y-scroll md:grid-cols-2 xl:grid-cols-3 md:grid ">
        {
          datas.map((item)=> (

            <ItemRejet item={item}  key={item.id}  />
          ))
        }
        
    </div>  
  
   </div>
  )
}

export default page