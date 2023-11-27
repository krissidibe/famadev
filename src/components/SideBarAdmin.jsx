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
    <div className={`bg-[#052703] md:w-[260px] w-full ${canClose  ? "" : "hidden"} md:flex  flex flex-col h-screen transition-all ease-in-out p-4 `}>
     
     <div className="flex items-center justify-center w-auto mt-10 space-x-4 ">
        <Image
          src="/images/logo_fama.png"
          alt="me"
          className="cursor-pointer rounded-xl "
          width={120}
          height={120}
        />
        
        </div>
      <div className="md:min-w-[450px] w-[353px] items-center justify-between my-2 flex space-x-2">
     
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
      <NavItem key={5} name="Deconnexion"  handleClick={() => signOut()}   Icon={ArrowLeftIcon} className="mb-20 bg-red-700 opacity-70" />
      
    </div>
  );
};

 

export default SideBarAdmin;
function NavItem({name,href = "",Icon,className="",handleClick}) { 
    const router = usePathname();

     
if(router == "/admin"){
  return (
    <Link
        href={href}
        onClick={handleClick}
        className={`flex py-3 px-4 mb-4 space-x-2 ${
          router.includes(href) ? "bg-white" : ""
        }  cursor-pointer rounded-xl group transition-all ease-in-out ${className}`}
      >
        <Icon
          className={`w-6 h-6   transition-all ease-in-out ${
            router.includes(href) ? "text-[#123610]" : "text-white"
          }`}
        /> 
        <p
          className={`text-[16px]    transition-all ease-in-out ${
            router.includes(href) ? "text-[#123610]" : "text-white"
          }`}
        >
          {name}
        </p>
      </Link>
  );
}
else{
  return (
    <Link
        href={href}
        onClick={handleClick}
        className={`flex py-3 px-4 mb-4 space-x-2 ${
          router.includes(href.split("/")[2]) ? "bg-white" : ""
        }  cursor-pointer rounded-xl group transition-all ease-in-out ${className}`}
      >
        <Icon
          className={`w-6 h-6    transition-all ease-in-out ${
            router.includes(href.split("/")[2])
              ? "text-[#123610]"
              : "text-white"
          }`}
        />
        <p
          className={`text-[16px]    transition-all ease-in-out ${
            router.includes(href.split("/")[2])
              ? "text-[#123610]"
              : "text-white"
          }`}
        >
          {name}
        </p>
      </Link>
  );  return (
    <Link href={href} onClick={handleClick} className={`flex py-3 px-4 mb-4 space-x-2 ${ router.includes(href.split("/")[2])  ? "bg-white" :""}  cursor-pointer rounded-xl group transition-all ease-in-out ${className}`}>
     
     
    <Icon  className={`w-6 h-6  group-hover:text-blue-500 transition-all ease-in-out ${ router.includes(href.split("/")[2])  ? "text-blue-500" :"text-gray-500"}`}   />
      <p className={`text-[16px]  group-hover:text-blue-500 transition-all ease-in-out ${ router.includes(href.split("/")[2])  ? "text-blue-500" :"text-gray-500"}`}>{name}</p>
    </Link>
  );
}
}
