import React from 'react'
import CrateAdmin from './create'
export const dynamic = "force-dynamic"
async function page() {
    const res = await fetch(`${process.env.BASE_URL}/api/superadmin/role`, {
        cache: "no-store",
      });
      const roles: any[] = await res.json();
  return (
    <div className='h-full'>
        {roles.length == 0 && <div className="flex items-center justify-center w-full h-full">
            La liste des rôles est vide veuillez créer au minimum un rôle
        </div> }
        {roles.length > 0 &&  <CrateAdmin roles={roles}/> }
       
    </div>
  )
}

export default page