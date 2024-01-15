import React from 'react'
import ShowPost from './ShowPost'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";
async function page({params}:{
    params:{
      postId: string
    }
  }) {

    const session = await getServerSession(authOptions)
    const res = await fetch(`${process.env.BASE_URL}/api/user/post?id=${params.postId}`, {
      cache: "no-store",
    });
    const datas: any = await res.json();


    const resType = await fetch(`${process.env.BASE_URL}/api/superadmin/posttype`, {
        cache: "no-store",
      });
      const datasType: any[] = await resType.json();
  return (
    <div>
        
 
<ShowPost     data={datas} />
 
    </div>
  )
}

export default page


