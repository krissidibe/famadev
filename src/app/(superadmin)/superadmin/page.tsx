import React from 'react'
import AdminProfileComponent from './AdminProfileComponent'
export const dynamic = "force-dynamic"
async function page() {

  const res = await fetch(`${process.env.BASE_URL}/api/superadmin/author`, {
    cache: "no-store",
  });
  const datas: any[] = await res.json();
  return (
    <div className="flex flex-wrap gap-4">
        {
          datas.map((item)=> (

            <AdminProfileComponent key={item.id} data={item} />
          ))
        }
        
    </div>
  )
}

export default page