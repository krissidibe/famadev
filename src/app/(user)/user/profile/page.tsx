


import { getServerSession } from "next-auth";
import UserProfile from './user'
import {prisma} from '@/utils/prisma'
import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { authOptions } from "@/lib/authOption";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export const dynamic = "force-dynamic";
async function Home() {
 const session = await getServerSession(authOptions)
 // const res = await fetch(`${process.env.BASE_URL}/api/user/candidature?id=${session?.user.email}`,{next:{revalidate:0}})

/* 
  const res = await fetch(`${process.env.BASE_URL}/api/user/author`, {
    body: JSON.stringify({
      email: "test@test.com",
      type: "user",
    }),
   headers:{
    "Content-type":"application/json"
   },
    method: "POST",
  });


  const data: any = await res.json();   */
  const data = await prisma.user.findUnique({
    where: {
      email:session?.user?.email ?? "",
    },
  });
  return (
    <div className="flex flex-col">
   
    
       
    <UserProfile data={data}/>
      
    </div>
  );
}

export default Home;
 

