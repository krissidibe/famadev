import React from 'react'
import EditPost from './EditPost'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";
async function page({params}:{
    params:{
      postId: string
    }
  }) {

    const session = await getServerSession(authOptions)
    const res = await fetch(`${process.env.BASE_URL}/api/admin/result?roleId=${JSON.parse(session!.user.adminRole).id}&id=${params.postId}`, {
      cache: "no-store",
    });
    const datas: any = await res.json();


    const resType = await fetch(`${process.env.BASE_URL}/api/superadmin/posttype`, {
        cache: "no-store",
      });
      const datasType: any[] = await resType.json();
  return (
    <div>
        
 
<EditPost   datasType={datasType} data={datas} />
 
    </div>
  )
}

export default page


