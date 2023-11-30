import { Inter } from "next/font/google";
//import React,{useState} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css";
import MenuComponent from "../../../components/MenuComponent";
import SideBarUser from "../../../components/SideBarUser";
import ModalInfo from "../../../components/ModalInfo";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; 
import Image from "next/image";
/* const inter = Inter({ subsets: ["latin"] });
 */
export const metadata = {
  title: "FAMA | Concours",
  description: "Défense et des anciens Combattants MDAC",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
   if(session?.user.role != "USER"){
    redirect("/")
  }  
  //const [showMenu, setshowMenu] = useState(false);
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className="flex flex-1 w-full h-screen">
        <ModalInfo title="Alert" body="kris" />

        <div className="hidden md:flex">
          <SideBarUser />
        </div>
        <div className="flex flex-col flex-1">
          <div className="w-full h-[70px] p-4 relative bg-[#0C4304]  text-white flex shadow-xl items-center justify-end">
         {/*  <Image
            src="/images/logo2.png"
            alt="me"
            className="absolute md:left-10 left-24"
            width="250"
            height="250"
          /> */}
           
 


          <div className="flex-col flex-1 text-[10px] ml-14 md:ml-0 text-center md:text-sm md:flex">
            <p>Ministère de la Défense et des Anciens Combattants</p>
            <p>État-Major Général des Armées</p>
          </div>



          <Image
          src="/images/logo_fama.png"
          alt="me"
          className="cursor-pointer rounded-xl md:hidden"
          width={50}
          height={50}
        />
         <div className="absolute inset-0 top-0">
         <MenuComponent />
         </div>
            <div className="items-center justify-center hidden md:flex">
              
              <Avatar>
                <AvatarImage
                  src={`${process.env.BASE_URL}${session?.user?.image}`}
                />
              <img src="/images/user1.png" alt=""    />
              </Avatar>
            </div>
          </div>
          <div className="w-screen h-full p-4 overflow-y-scroll md:w-full md:p-10 ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
