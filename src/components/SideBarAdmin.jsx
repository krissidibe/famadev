"use client"
import React,{useState,useCallback} from "react";
 
import Link from "next/link";
import Image from "next/image";
import { useRouter ,usePathname} from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { HomeIcon,BookOpenIcon,UserIcon,AcademicCapIcon,ArrowLeftIcon ,XCircleIcon} from '@heroicons/react/24/solid'
const SideBarAdmin = ({show=true,handleClick=()=>{

   useRouter().refresh();
   

}}) => {
  const [canClose, setCanClose] = useState(true);

  const toogleClose = ()=> {
    setCanClose(x=> x = !x)
  }

  //  alert()
  return (
    <div className={`bg-neutral-800 md:w-[260px] w-full ${canClose  ? "" : "hidden"} md:flex  flex flex-col h-screen transition-all ease-in-out p-4 `}>
      <div className="md:min-w-[450px] w-[353px] items-center justify-between my-4 flex space-x-2">
     <div className="flex items-center space-x-4">
     <Image
          src="/images/logo.png"
          alt="me"
          className=" left-20"
          width="40"
          height="40"
        />
        <p className="text-white" >DNAJ</p>
     </div>
        { show &&
         <XCircleIcon   onClick={toogleClose}  className={ `cursor-pointer w-6 h-6 md:hidden self text-gray-500 group-hover:text-blue-500 transition-all ease-in-out hover:text-blue-500 hover:scale-110 `}   />

      }
      </div>
      <div className="flex flex-col mt-[30px] flex-1   ">
       
        <NavItem key={1} handleClick={handleClick} name="Tableau de bord"  href="/admin" Icon={HomeIcon} />
        <NavItem key={2} handleClick={handleClick} name="Concours" href="/admin/competitions"  Icon={BookOpenIcon} />
        <NavItem key={3} handleClick={handleClick} name="Candidatures" href="/admin/candidatures"  Icon={AcademicCapIcon} />
      {/*   <NavItem key={4} handleClick={handleClick} name="Profile" href="/admin/profile" Icon={UserIcon}  /> */}
       
      </div>
      <NavItem key={5} name="Deconnexion"  handleClick={() => signOut()}   Icon={ArrowLeftIcon} className="mb-20" />
      
    </div>
  );
};

 

export default SideBarAdmin;
function NavItem({name,href = "",Icon,className="",handleClick}) { 
    const router = usePathname();

     
if(router == "/admin"){
  return (
    <Link href={href} onClick={handleClick} className={`flex py-3 px-4 mb-4 space-x-2 ${ router.includes(href)  ? "bg-white" :""}  cursor-pointer rounded-xl group transition-all ease-in-out ${className}`}>
     
     
    <Icon  className={`w-6 h-6  group-hover:text-blue-500 transition-all ease-in-out ${ router.includes(href)  ? "text-blue-500" :"text-gray-500"}`}   />
      <p className={`text-[16px]  group-hover:text-blue-500 transition-all ease-in-out ${ router.includes(href)  ? "text-blue-500" :"text-gray-500"}`}>{name}</p>
    </Link>
  );
}
else{
  return (
    <Link href={href} onClick={handleClick} className={`flex py-3 px-4 mb-4 space-x-2 ${ router.includes(href.split("/")[2])  ? "bg-white" :""}  cursor-pointer rounded-xl group transition-all ease-in-out ${className}`}>
     
     
    <Icon  className={`w-6 h-6  group-hover:text-blue-500 transition-all ease-in-out ${ router.includes(href.split("/")[2])  ? "text-blue-500" :"text-gray-500"}`}   />
      <p className={`text-[16px]  group-hover:text-blue-500 transition-all ease-in-out ${ router.includes(href.split("/")[2])  ? "text-blue-500" :"text-gray-500"}`}>{name}</p>
    </Link>
  );  return (
    <Link href={href} onClick={handleClick} className={`flex py-3 px-4 mb-4 space-x-2 ${ router.includes(href.split("/")[2])  ? "bg-white" :""}  cursor-pointer rounded-xl group transition-all ease-in-out ${className}`}>
     
     
    <Icon  className={`w-6 h-6  group-hover:text-blue-500 transition-all ease-in-out ${ router.includes(href.split("/")[2])  ? "text-blue-500" :"text-gray-500"}`}   />
      <p className={`text-[16px]  group-hover:text-blue-500 transition-all ease-in-out ${ router.includes(href.split("/")[2])  ? "text-blue-500" :"text-gray-500"}`}>{name}</p>
    </Link>
  );
}
}
