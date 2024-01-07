import React from 'react'
 import CreatePost from './CreatePost'

async function page() {
    const resType = await fetch(`${process.env.BASE_URL}/api/superadmin/posttype`, {
        cache: "no-store",
      });
      const datasType: any[] = await resType.json();
  return (
    <div>
        
 

<CreatePost datasType={datasType} />
    </div>
  )
}

export default page


