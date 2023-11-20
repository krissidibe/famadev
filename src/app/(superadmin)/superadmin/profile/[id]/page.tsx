import React from 'react'
import ProfileEdit from './profileEdit';
export const dynamic = "force-dynamic"
async function page({params}:{params :{
    id: string
}}) {
    const res = await fetch(`${process.env.BASE_URL}/api/superadmin/author?id=${params.id}`, {
        cache: "no-store",
      });
      const data: any[] = await res.json();
  return (
    <div> 
    
    <ProfileEdit data={data}/>
    </div>
  )
}

export default page